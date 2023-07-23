const Data =require('../models/dataModels');

exports.getAllData = async (req, res) => {
    try {
        const data = await Data.find();
        res.status(200).json({
            status: 'success',
            results: data.length,
            data: {
                data
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail'
        });
    }
}

exports.getData = async (req, res) => {
    try {
        const data = await Data.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                data
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail'
        });
    }
}

exports.createData = async (req, res) => {
    try {
        const data = await Data.create(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                data
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail'
        });
    }
}

exports.updateData = async (req, res) => {
    try {
        const data = await Data.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                data
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail'
        });
    }
}

exports.deleteData = async (req, res) => {
    try {
        const data = await Data.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail'
        });
    }
}

exports.deleteAllData = async (req, res) => {
    try {
        const data = await Data.deleteMany();
        res.status(200).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail'
        });
    }
}
