import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const createCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        if(newCategory.name)
            return res.status(400).json("Tên danh sách bị trùng");
        const saveCategory = await newCategory.save();
        res.status(200).json(saveCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const updateCategory = async (req,res)=>{
    try {
        const updateCategory = await Category.findByIdAndUpdate(req.params.id, req.body,{new:true});
        if(!updateCategory)
            return res.status(404).json("Không tìm thấy danh sách cần cập nhật");
        res.status(200).json(updateCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Lỗi hệ thống", error});
    }
}

export const deleteCategory =async(req,res)=>{
    try {
        const deleteCategory = await Category.findByIdAndDelete(req.params.id);
        if(!deleteCategory)
            res.status(404).json("Không tìm thấy danh sách cần xóa");
        res.status(200).json(deleteCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Lỗi hệ thống",error});
    }
}
