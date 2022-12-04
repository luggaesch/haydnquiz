import {useState} from "react";
import {Form, Modal, Upload, UploadFile} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import axios from "axios";
import {v4} from "uuid";
import Image from "next/image";
import {RcFile} from "antd/es/upload";

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

const uploadButton = (
    <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
);

export default function MediaUpload({ files, setFiles }: { files: UploadFile[], setFiles: (files: UploadFile[]) => void }) {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    return (
        <Form.Item>
            <>
                <Upload
                    customRequest={async (req) => {
                        const data = new FormData();
                        data.set("image", req.file);
                        const res = await axios.post("https://api.imgur.com/3/upload", data, { headers: { 'Authorization': `Client-ID b6fc4610962fa99` } });
                        console.log(res);
                        const { id, link } = res.data.data;
                        setFiles([...files, { uid: v4(), name: id, url: link }])
                    }
                    }
                    listType="picture-card"
                    fileList={files}
                >
                    {files.length >= 12 ? null : uploadButton}
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel} style={{ width: '100%', height: "100%" }}>
                    <Image layout={"fill"} objectFit={"contain"} alt="example"  src={previewImage} />
                </Modal>
            </>
        </Form.Item>
    )
}