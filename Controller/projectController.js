const projects = require("../Model/projectSchema");

// add projects

exports.addProjects = async (req, res) => {
  console.log("inside add project function");
  const userId = req.payload;
  const projectImage = req.file.filename;
  console.log(projectImage);
  const { title, language, overview, github, website } = req.body;
  // console.log(`${userId},${title},${language},${overview},${github},${website}`);

  try {
    const existingProject = await projects.findOne({ github });
    if (existingProject) {
      res.status(406).json("projects already exists!! add another one");
    } else {
      const newProject = new projects({
        title,
        language,
        overview,
        github,
        website,
        projectImage,
        userId,
      });
      await newProject.save();
      res.status(200).json(newProject);
    }
  } catch (err) {
    res.status(401).json(`add Project api failed , Error:${err}`);
  }
};

// getAllUserProject

exports.allUserProject = async (req, res) => {
  const userId = req.payload;
  try {
    const userProjects = await projects.find({ userId });
    res.status(200).json(userProjects);
  } catch (error) {
    res.status(401).json(error);
  }
};

// allProjects

exports.getAllProject = async (req, res) => {
  const searchKey = req.query.search;
  const query = {
    language: { $regex: searchKey, $options: "i" },
  };

  try {
    const projectDetails = await projects.find(query);
    res.status(200).json(projectDetails);
  } catch (error) {
    res.status(401).json(error);
  }
};

// getHomeProjects

exports.getHomeProject = async (req, res) => {
  try {
    const homeProjects = await projects.find().limit(3);
    res.status(200).json(homeProjects);
  } catch (error) {
    res.status(401).json(error);
  }
};

// edit project
exports.editProjectController = async (req, res) => {
  // get project id
  const { id } = req.params;
  const userId = req.payload;
  const { title, language, overview, github, website, projectImage } = req.body;
  const uploadProjectImage = req.file ? req.file.filename : projectImage;
  try {
    const updateProject = await projects.findByIdAndUpdate(
      { _id: id },
      {
        title,
        language,
        overview,
        github,
        website,
        projectImage: uploadProjectImage,
        userId,
      },
      { new: true }
    );
    await updateProject.save();
    res.status(200).json(updateProject);
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.deleteProjectController= async(req,res)=>{
  //get project detaols
  const{id}=req.params
  try {
    const removeProject = await projects.findByIdAndDelete({_id:id})
    res.status(200).json(removeProject);

  } catch (err) {
    res.status(401).json(err);

  }
}
