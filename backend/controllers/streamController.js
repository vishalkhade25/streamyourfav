import fs from "fs";
import path from "path";

const streamVideo = async (req, res) => {
    try {
        const range = req.headers.range;

        if (!range) {
            // const headers = {
            //     "Content-Length": videoSize,
            //     "Content-Type": "video/mp4"
            // };
            // res.writeHead(200, headers);
            // fs.createReadStream(videoPath).pipe(res);
            // return;
            return res.status(400).send("Range header is required");
        }

        const videoPath = path.join(process.cwd(), "videos", req.params.filename);
        const videoSize = fs.statSync(videoPath).size;

        const CHUNK_SIZE = 1000000;
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        const contentLength = end - start + 1;

        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4"
        }

        res.writeHead(206, headers)

        const videoStream = fs.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export default streamVideo;