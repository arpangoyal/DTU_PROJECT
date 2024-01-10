import { connectDB } from "../data/database.js";
import multer from "multer";

const storage = multer.memoryStorage(); // Store the file in memory as Buffer
const upload = multer({ storage: storage });

export const uploadImage = (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      console.error('Error uploading image: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    // console.log(req);
    // Access the uploaded file information
    const {originalname, buffer } = req.file;
    const {rollNo} = req.body;
    
    // Convert the image buffer to base64 for storing in the database
    const base64Image = buffer.toString('base64');

    // Save image information to the database
    const query = 'UPDATE images SET originalname = ?, image_data = ? WHERE rollNo = ?';
    connectDB.query(query, [originalname, base64Image,rollNo], (dbErr, result) => {
      if (dbErr) {
        console.error('Error inserting into database: ' + dbErr.stack);
        res.status(500).send('Internal Server Error');
      } else {
        // console.log('Image uploaded and saved to database');
        res.status(200).send('Image uploaded and saved to database');
      }
    });
  });
};

export const getImage = (req, res) => {
  const { rollNo } = req.body; // Assuming you send the 'id' in the request body
  // Retrieve image data from the database based on the provided 'id'
  const query = 'SELECT image_data, originalname FROM images WHERE rollNo = ?';
  connectDB.query(query, [rollNo], (err, result) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (result.length > 0) {
      const { image_data, originalname } = result[0];

      // Convert the base64-encoded image data back to a Buffer
      if(image_data){
      const imageBuffer = Buffer.from(image_data, 'base64');

      // Set the appropriate headers for the image response
      res.setHeader('Content-Type', 'image/*');
      res.setHeader('Content-Disposition', `inline; filename=${originalname}`);
      // Send the image data as the response
      res.end(imageBuffer);
      }
    } else {
      res.status(404).send('Image not found');
    }
  });
};


export const getall = (req, res) => {
  connectDB.query("SELECT * FROM student_data", (error, results) => {
    if (error) {
      console.error("Error querying database: " + error.stack);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
};

export const getProfessionalSkills = (req, res) => {
  const { rollno } = req.body;
  const sql = "SELECT * FROM EventDetails WHERE RollNo = ?";
  connectDB.query(sql, [rollno], (err, results) => {
    if (err) {
      console.error("Error executing fetch query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Always return an array, even if it's empty
    const user = results || [];

    res.status(200).json({
      user,
      success: true,
    });
  });
};

export const updateProfessionalSkills = (req, res) => {
  const { id, organisation, position, eventname, date,roll } = req.body;
  const sql =
    "UPDATE EventDetails SET Organisation = ?, Position = ?, EventName = ?, EventDate = ? ,RollNo = ? WHERE ID = ?";

  connectDB.query(
    sql,
    [organisation, position, eventname, date,roll, id],
    (err, result) => {
      if (err) {
        console.error("Error executing update query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      // Check if any row is affected (indicating a successful update)
      if (result.affectedRows > 0) {
        res.status(200).json({
          success: true,
          message: "Record updated successfully",
        });
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    }
  );
};


export const deleteProfessionalSkills = (req, res) => {
  const { ID } = req.body;
  const sql = "DELETE FROM EventDetails WHERE ID = ?";

  connectDB.query(sql, [ID], (err, result) => {
    if (err) {
      console.error("Error executing delete query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Check if any row is affected (indicating a successful delete)
    if (result.affectedRows > 0) {
      res.status(200).json({
        success: true,
        message: "Record deleted successfully",
      });
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  });
};

export const addProfessionalSkills = (req, res) => {
  const { organisation, position, eventname, date, roll ,ID } = req.body;
  const sql =
    "INSERT INTO EventDetails (Organisation, Position, EventName, EventDate, RollNo ,ID) VALUES (?, ?, ?, ?, ? ,?)";

  connectDB.query(
    sql,
    [organisation, position, eventname, date, roll, ID],
    (err, result) => {
      if (err) {
        console.error("Error executing insert query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      // Check if a new row is inserted (indicating a successful add)
      if (result.affectedRows > 0) {
        res.status(201).json({
          success: true,
          message: "Record added successfully",
        });
      } else {
        res.status(400).json({ error: "Failed to add record" });
      }
    }
  );
};

export const getPersonalDetails = (req, res) => {
  const { rollno } = req.body;
  const sql = "SELECT * FROM studentPersonalDetails where RollNo = ?";
  connectDB.query(sql, [rollno], (err, results) => {
    if (err) {
      console.error("Error executing fetch query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Check if the user with the given credentials exists
    if (results.length > 0) {
      res.status(200).json({
        user: results,
        success: true,
      });
    } else {
      res.status(401).json({ error: "No data Exist" });
      return;
    }
  });

};

export const updatePersonalDetails = (req, res) => {

  const { id, motherName, fatherName, personalContactNo, parentContactNo , personalEmail, dtuEmail } = req.body;
  const sql =
    "UPDATE studentPersonalDetails SET motherName = ?, fatherName = ?, personalContactNo = ?, parentContactNo = ? ,personalEmail = ?,dtuEmail = ? WHERE RollNo = ?";

  connectDB.query(
    sql,
    [motherName,fatherName,personalContactNo,parentContactNo,personalEmail,dtuEmail,id],
    (err, result) => {
      if (err) {
        console.error("Error executing update query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      // Check if any row is affected (indicating a successful update)
      if (result.affectedRows > 0) {
        res.status(200).json({
          success: true,
          message: "Record updated successfully",
        });
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    }
  );
};

// placement table


export const deletePlacement = (req, res) => {
  const { ID } = req.body;
  const sql = "DELETE FROM placementData WHERE ID = ?";

  connectDB.query(sql, [ID], (err, result) => {
    if (err) {
      console.error("Error executing delete query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Check if any row is affected (indicating a successful delete)
    if (result.affectedRows > 0) {
      res.status(200).json({
        success: true,
        message: "Record deleted successfully",
      });
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  });
};

export const addPlacement = (req, res) => {
  // console.log(req);
  const { companyName, placementType, joiningDate, roll ,ID } = req.body;
  
  const sql ='UPDATE placementData SET companyName = ?, placementType = ?, joiningDate = ?, RollNo = ? WHERE ID = ?';
  // console.log(ID);

  connectDB.query(
    sql,
    [companyName, placementType, joiningDate, roll, ID],
    (err, result) => {
      if (err) {
        // console.error("Error executing insert query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      // console.log(result);
      // Check if a new row is inserted (indicating a successful add)
      if (result.affectedRows > 0) {
        res.status(201).json({
          success: true,
          message: "Record added successfully",
        });
      } else {
        res.status(400).json({ error: "Failed to add record" });
      }
    }
  );
};

export const getPlacement = (req, res) => {
  const { rollno } = req.body;
  const sql = "SELECT * FROM placementData where RollNo = ?";
  connectDB.query(sql, [rollno], (err, results) => {
    if (err) {
      console.error("Error executing fetch query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Check if the user with the given credentials exists
    if (results.length > 0) {
      res.status(200).json({
        user: results,
        success: true,
      });
    } else {
      res.status(401).json({ error: "No data Exist" });
      return;
    }
  });

};

export const uploadPdf = (req, res) => {
  upload.single('pdf')(req, res, async (err) => {
    if (err) {
      console.error('Error uploading PDF: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Access the uploaded file information
    // console.log(req.body);
    const { buffer } = req.file;
    const { id } = req.body;
    // const id = '2K20/EC/0371704815836050'
    // Convert the PDF buffer to base64 for storing in the database
    const base64PDF = buffer.toString('base64');

    // Save PDF information to the database
    const query = 'INSERT INTO placementData (appointmentLetter, ID) VALUES (?, ?)';

    connectDB.query(query, [base64PDF, id], (dbErr, result) => {
      if (dbErr) {
        console.error('Error inserting into database: ' + dbErr.stack);
        res.status(500).send('Internal Server Error');
      } else {
        // console.log('PDF uploaded and saved to database'); 
        res.status(200).send('PDF uploaded and saved to database');
      }
    });
  });
};


export const getPdf = (req, res) => {
  const { id } = req.body;
  
  // Retrieve PDF data from the database based on the provided 'id'
  const query = 'SELECT appointmentLetter FROM placementData WHERE ID = ?';
  connectDB.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (result.length > 0) {
      const { appointmentLetter } = result[0];

      // Convert the base64-encoded PDF data back to a Buffer
      if (appointmentLetter) {
        const pdfBuffer = Buffer.from(appointmentLetter, 'base64');

        // Set the appropriate headers for the PDF response
        res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', `inline; filename=${originalname}`);
        // Send the PDF data as the response
        res.end(pdfBuffer);
      }
    } else {
      res.status(404).send('PDF not found');
    }
  });
};
