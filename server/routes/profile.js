const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Profile = require("../models/Profile");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const config = require("config");
const clientId = config.get("clientId");
const clientSecret = config.get("clientSecret");
const axios = require("axios");

//GET LOGGED IN USER PROFILE
router.get("/", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name"]);
    if (!profile) {
      return res.status(400).json({ msg: "No profile found" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//CREATE AND UPDATE PROFILE
router.post("/", [
  auth,
  [
    check("location", "Location is required").not().isEmpty(),
    check("skills", "Skills are required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      location,
      skills,
      bio,
      githubUserName,
      youtube,
      twitter,
      facebook,
      instagram,
      linkedin,
    } = req.body;

    const data = {};
    data.user = req.user.id;
    if (location) {
      data.location = location;
    }
    if (skills) {
      data.skills = skills.split(",").map((skill) => skill.trim());
    }
    if (bio) {
      data.bio = bio;
    }
    if (githubUserName) {
      data.githubUserName = githubUserName;
    }
    data.social = {};
    if (youtube) {
      data.social.youtube = youtube;
    }
    if (instagram) {
      data.social.instagram = instagram;
    }
    if (facebook) {
      data.social.facebook = facebook;
    }
    if (linkedin) {
      data.social.linkedin = linkedin;
    }
    if (twitter) {
      data.social.twitter = twitter;
    }

    try {
      let profile = await Profile.findOne({
        user: req.user.id,
      });
      if (!profile) {
        profile = new Profile(data);
        await profile.save();
        return res.json(profile);
      }
      profile = await Profile.findOneAndUpdate(
        {
          user: req.user.id,
        },
        {
          $set: data,
        },
        {
          new: true,
        }
      );
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  },
]);

//GET PROFILES OF ALL THE USERS
router.get("/all", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name"]);
    if (!profiles) {
      return res.status(400).json({ msg: "No profiles found!!" });
    }
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

//GET A SPECIFIC USER PROFILE
router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.id,
    }).populate("user", ["name"]);
    if (!profile) {
      return res.status(400).json({ msg: "No profile found!!!" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).send("No profile found");
    }
    res.status(500).send("Server error");
  }
});

//DELETE USER AND PROFILE
router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({
      user: req.user.id,
    });
    await User.findOneAndRemove({
      user: req.user.id,
    });
    res.send("User Deleted!!!");
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

//ADD EXPERIENCE
router.post(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      current,
      from,
      to,
      description,
      location,
    } = req.body;

    const experience = {
      title,
      company,
      current,
      from,
      to,
      description,
      location,
    };
    try {
      let profile = await Profile.findOne({
        user: req.user.id,
      });
      if (!profile) {
        return res.status(400).json({ msg: "No profile found" });
      }
      profile.experience.unshift(experience);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

//EDIT EXPERIENCE
router.put("/experience/:experienceId", auth, async (req, res) => {
  const { title, company, current, from, to, description, location } = req.body;
  try {
    let profile = await Profile.findOne({
      user: req.user.id,
    });
    if (!profile) {
      return res.status(400).json({ msg: "No profile found" });
    }
    profile.experience.forEach((exp) => {
      if (exp.id == req.params.experienceId) {
        exp.title = title;
        exp.description = description;
        exp.company = company;
        exp.to = to;
        exp.from = from;
        exp.current = current;
        exp.location = location;
      }
    });
    console.log(profile);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).send("No profile found");
    }
    res.status(500).send("Server error");
  }
});

//DELETE EXPERIENCE
router.delete("/experience/:experienceId", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.user.id,
    });
    if (!profile) {
      return res.status(400).json({ msg: "No profile found" });
    }
    const index = profile.experience
      .map((exp) => exp._id)
      .indexOf(req.params.experienceId);
    profile.experience.splice(index, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).send("No profile found");
    }
    res.status(500).send("Server error");
  }
});

//ADD EDUCATION
router.post(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("fieldOfStudy", "Field of Study is required").not().isEmpty(),
      check("from", "From is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      fieldOfStudy,
      current,
      from,
      to,
      description,
      degree,
    } = req.body;

    const education = {
      school,
      fieldOfStudy,
      current,
      from,
      to,
      description,
      degree,
    };
    try {
      let profile = await Profile.findOne({
        user: req.user.id,
      });
      if (!profile) {
        return res.status(400).json({ msg: "No profile found" });
      }
      profile.education.unshift(education);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

//EDIT EDUCATION
router.put("/education/:educationId", auth, async (req, res) => {
  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description,
  } = req.body;
  try {
    let profile = await Profile.findOne({
      user: req.user.id,
    });
    if (!profile) {
      return res.status(400).json({ msg: "No profile found" });
    }
    profile.education.forEach((edu) => {
      if (edu.id == req.params.educationId) {
        edu.school = school;
        edu.description = description;
        edu.degree = degree;
        edu.to = to;
        edu.from = from;
        edu.current = current;
        edu.fieldOfStudy = fieldOfStudy;
      }
    });
    console.log(profile);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).send("No profile found");
    }
    res.status(500).send("Server error");
  }
});

//DELETE EDUCATION
router.delete("/education/:educationId", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.user.id,
    });
    if (!profile) {
      return res.status(400).json({ msg: "No profile found" });
    }
    const index = profile.education
      .map((edu) => edu._id)
      .indexOf(req.params.educationId);
    profile.education.splice(index, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).send("No profile found");
    }
    res.status(500).send("Server error");
  }
});

//GET ALL GITHUB REPOS
router.get("/repos/:username", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${clientId}&client_secret=${clientSecret}`
    );
    if (!response) {
      return res.status(404).send("No profile found");
    }
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
