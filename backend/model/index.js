import mongoose from "mongoose";
import xlsx from "xlsx";
import config from "../utils/config.js";

// Function to import Excel data into a new collection
async function importExcelData() {
  try {
    console.log("📂 Importing Excel data...");

    // Absolute path to your Excel file
    const filePath = "C:/Users/SEC/Desktop/botcode/backend/dataset/data.xlsx";
    console.log(`Excel file path: ${filePath}`);

    // Read Excel
    console.log("📖 Reading Excel file...");
    const workbook = xlsx.readFile(filePath);
    console.log("✅ Excel file read successfully.");

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log(`📊 Rows parsed from Excel: ${data.length}`);

    if (data.length === 0) {
      console.log("❌ Excel file is empty.");
      return;
    }

    // Create a collection name based on file name + timestamp
    const collectionName = `excel_${Date.now()}`;
    console.log(`🛠 Creating new collection: ${collectionName}`);

    // Insert directly into MongoDB without predefined schema
    const result = await mongoose.connection.db
      .collection(collectionName)
      .insertMany(data);

    console.log(`✅ Data inserted into ${collectionName}`, result);
  } catch (err) {
    console.error("🔥 Error importing Excel:", err);
  }
}

main().catch((error) =>
  console.error("MongoDB Connection Failed", error)
);

async function main() {
  await mongoose.connect(`${config.DB_URL}/${config.DB_NAME}`);
  console.log("✅ Mongoose Connected!");

  // Run Excel import ONCE at startup (comment out after use)
//   await importExcelData();
}

export default mongoose;
