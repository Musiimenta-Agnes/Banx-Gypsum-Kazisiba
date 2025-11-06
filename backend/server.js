

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));



// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/temp");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });
// const upload = multer({ storage });




// app.post("/upload", upload.single("file"), (req, res) => {
//   if (!req.file) return res.status(400).json({ message: "No file uploaded" });
//   if (!req.body.title) return res.status(400).json({ message: "Title is required" });

//   const page = req.body.page || "gallery";
//   const section = req.body.section || "";

//   let baseFolder = path.join(__dirname, "uploads", page);
//   if (!fs.existsSync(baseFolder)) fs.mkdirSync(baseFolder, { recursive: true });

//   let savePath = baseFolder;
//   if (section) {
//     savePath = path.join(baseFolder, section);
//     if (!fs.existsSync(savePath)) fs.mkdirSync(savePath, { recursive: true });
//   }

//   const finalFilePath = path.join(savePath, req.file.filename);
//   fs.renameSync(req.file.path, finalFilePath);

//   let jsonFilePath;
//   if (page === "materials") {
//     jsonFilePath = path.join(baseFolder, "materials.json");
//   } else if (section) {
//     jsonFilePath = path.join(baseFolder, `${section}.json`);
//   } else {
//     jsonFilePath = path.join(baseFolder, `${page}.json`);
//   }

//   let data = [];
//   if (fs.existsSync(jsonFilePath)) {
//     try {
//       data = JSON.parse(fs.readFileSync(jsonFilePath));
//     } catch (err) {
//       data = [];
//     }
//   }

//   data.push({
//     filename: req.file.filename,
//     path: `uploads/${page}${section ? "/" + section : ""}/${req.file.filename}`,
//     title: req.body.title,
//     filetype: req.file.mimetype.startsWith("image") ? "image" : "video",
//   });

//   fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));

//   res.json({ message: "Uploaded & saved successfully!" });
// });

// app.listen(5000, () => console.log("Server running on port 5000"));

















const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Pages with optional sections
const pagesWithSections = {
  gallery: [],
  projects: [],
  homepage: [],
  materials: ["gypsum", "ceiling", "wall panels"], // optional sections
};

// Ensure all folders exist
Object.keys(pagesWithSections).forEach((page) => {
  const sections = pagesWithSections[page];
  if (sections.length === 0) {
    const dir = path.join(__dirname, "uploads", page);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  } else {
    sections.forEach((sec) => {
      const dir = path.join(__dirname, "uploads", page, sec);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });
  }
});

// Multer storage: dynamic folder based on page & section
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const page = req.body.page || "gallery";
    const section = req.body.section || "";
    let dir = path.join(__dirname, "uploads", page);
    if (section) dir = path.join(dir, section);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload route
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const page = req.body.page || "gallery";
  const section = req.body.section || "";

  // ✅ Title is NOT required for Materials
  if (page !== "materials" && !req.body.title) {
    return res.status(400).json({ message: "Title is required" });
  }

  // JSON file path
  let jsonFilePath = path.join(__dirname, "uploads", page);
  if (page === "materials") {
    jsonFilePath = path.join(jsonFilePath, "materials.json");
  } else if (section) {
    jsonFilePath = path.join(jsonFilePath, `${section}.json`);
  } else {
    jsonFilePath = path.join(jsonFilePath, `${page}.json`);
  }

  // Read existing data
  let data = [];
  if (fs.existsSync(jsonFilePath)) {
    try {
      data = JSON.parse(fs.readFileSync(jsonFilePath));
    } catch {
      data = [];
    }
  }

  // ✅ Add uploaded file entry
  data.push({
    filename: req.file.filename,
    path: `uploads/${page}/${section ? section + "/" : ""}${req.file.filename}`.replace(/\\/g, "/"),
    title: page === "materials" ? null : req.body.title,
    filetype: req.file.mimetype.startsWith("image") ? "image" : "video",
    section: section || null,
    uploadedAt: new Date()
  });

  fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));

  res.json({ message: "File uploaded successfully", file: req.file.filename });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




