import doctorModel from "../models/doctorModel.js";

const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
      // Toggle availability
    docData.available = !docData.available;
    await docData.save();

    res.json({
      success: true,
      message: "Availability Changed",
      available: docData.available
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorList =async(req,res)=>{
  try{
      const doctors = await doctorModel.find({}).select(['-password','-email'])

      res.json({success:true,doctors}) 
      
  }catch(error){
   console.log(error);
    res.json({ success: false, message: error.message });

  }
}




export default changeAvailablity;
export {doctorList}
