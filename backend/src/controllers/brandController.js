import Brand from "../models/Brand.js";

export const createBrand = async (req, res) => {
    try {
        const newBrand = new Brand(req.body);
        const savedBrand = await newBrand.save();
        res.status(200).json(savedBrand);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const getBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json(brands);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const getBrand = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand)
            return res.status(404).json("Không tìm thấy thuơng hiệu");
        res.status(200).json(brand);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const updateBrand = async (req, res) => {
    try {
        const updateBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateBrand)
            return res.status(404).json("Không tìm thấy thuơng hiệu cần cập nhật!!!");
        res.status(200).json(updateBrand);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const deleteBrand = async (req, res) => {
    try {
        const deleteBrand = await Brand.findByIdAndDelete(req.params.id);
        if (!deleteBrand) {
            return res.status(404).json("Không tìm thấy danh sách cần xóa");
        }
        res.status(200).json(deleteBrand);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Có lỗi xảy ra khi xóa danh sách", error });
    }
}