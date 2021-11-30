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

const saveFile = async (file) => {
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(`./public/${file.originalFilename}`, data);
    await fs.unlinkSync(file.filepath);

    return file.originalFilename
};

export default (req, res) => {
    req.method === "POST"
        ? post(req, res)
        : req.method === "PUT"
            ? console.log("PUT")
            : req.method === "DELETE"
                ? console.log("DELETE")
                : req.method === "GET"
                    ? console.log("GET")
                    : res.status(404).send("");
};