import formidable from "formidable";
import fs from "fs";

export const config = {
    api: {
        bodyParser: false
    }
};

const post = async (req, res) => {
    const form = new formidable.IncomingForm();
    const parse = form.parse(req, async function (err, fields, files) {
        const fileName = await saveFile(files.file);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({fileName: fileName}, null, 2));
    });

    return res
};

const del = async (req, res) => {
    delFile(`./public/${req.query.path}`)
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({message: 'DELETED'}, null, 2));
}

const saveFile = async (file) => {
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(`./public/${file.originalFilename}`, data);
    return file.originalFilename
};

const delFile = async (path) => {
    await fs.unlinkSync(path);
}

export default (req, res) => {
    switch (req.method){
        case 'POST':
            post(req, res)
            break;
        case 'DELETE':
            del(req, res)
            break;
        default:
            res.status(404).send("");
            break;

    }



};
