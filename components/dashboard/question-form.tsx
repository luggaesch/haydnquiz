import {useState} from "react";
import {Topics} from "../../data/topics";
import Question, {getMediaTypeByQuestionType, QuestionTypes, SolutionTypes} from "../../types/question";
import {Jokers} from "../../data/jokers";
import {Button, Form, Input, InputNumber, Modal, Radio, Select, Slider, Switch, Upload, UploadFile} from "antd";
import {RcFile} from "antd/es/upload";
import {PlusOutlined} from "@ant-design/icons";
import Media from "../../types/media";
import axios from "axios";
import styles from "../../styles/form.module.css";
import {v4} from "uuid";
import Image from "next/image";
import QuestionWrapper from "../questions/wrapper";
import {MediaTypes} from "../../data/questions";

const { Option } = Select;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
}

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

export default function QuestionForm({ question, addQuestion }: { question?: Question, addQuestion: (question: Question) => void }) {
    const [topic, setTopic] = useState<Topics>(question ? question.topic : Topics.Nature);
    const [questionType, setQuestionType] = useState<QuestionTypes>(question ? question.type : QuestionTypes.Basic);
    const [caption, setCaption] = useState(question ? question.caption : "");
    const [time, setTime] = useState(question ? question.timeInSeconds : 60);
    const [hasJokerValue, setHasJokerValue] = useState(question ? Boolean(question.jokerReward) : false);
    const [questionValue, setQuestionValue] = useState(question ? question.value : 2);
    const [joker, setJoker] = useState<Jokers>((question && question.jokerReward) ? question.jokerReward : Jokers.Wikipedia);
    const [mediaContent, setMediaContent] = useState((question && question.media) ? question.media.content : "");
    const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
    const [solutionType, setSolutionType] = useState<SolutionTypes>(question ? question.solutionType : SolutionTypes.Text);
    const [solutionContent, setSolutionContent] = useState(question ? question.solution : "")
    const [solutionFile, setSolutionFile] = useState<UploadFile[]>([]);
    const [solutionList, setSolutionList] = useState((question && question.solutionArray) ? question.solutionArray : [""]);
    const [choices, setChoices] = useState<string[]>((question && question.choices) ? question.choices : ["A", "B", "C", "D"]);
    const [unit, setUnit] = useState((question && question.unit) ? question.unit : "");
    const [sortItems, setSortItems] = useState<{ name: string, value: number}[]>((question && question.sortElements) ? question.sortElements : [{ name: "", value: 0 }]);
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

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    async function handleSubmit() {
        const mediaType = getMediaTypeByQuestionType(questionType);
        const media: Media | undefined = mediaType ? { type: mediaType, content: mediaContent !== "" ? mediaContent : undefined, sources: imageFileList.length > 0 ? imageFileList.map((file) => file.url!) : undefined } : undefined;
        const question: Question = {
            topic,
            type: questionType,
            caption,
            timeInSeconds: questionType === QuestionTypes.Sort ? -1 : time,
            value: hasJokerValue ? -1 : questionValue,
            jokerReward: hasJokerValue ? joker : undefined,
            solution: solutionContent !== "" ? solutionContent : "...",
            solutionType,
            solutionArray: solutionType === SolutionTypes.List ? solutionList : undefined,
            media,
            choices: questionType === QuestionTypes.Choice ? choices : undefined,
            sortElements: questionType === QuestionTypes.Sort ? sortItems : undefined,
            unit: questionType === QuestionTypes.Sort ? unit : undefined
        }
        addQuestion(question);
    }

    // @ts-ignore
    return (
        <div style={{ background: "#222", width: "100vw", height: "100vh", color: "white", display: "flex", alignItems: "center", gridTemplateColumns: "60% 40%", overflow: "hidden" }}>
            <Form name="Add Question" style={{ height: "100%", padding: 10, color: "white", fontSize: "2rem", width: "60%" }} {...formItemLayout}>
                <Form.Item label="Topic" className={styles.form}>
                    <Select defaultValue={topic} onChange={(nextValue) => setTopic(nextValue)}>
                        {Object.values(Topics).map((value, index) => (
                            <Option key={index} value={value}>{value}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Question Type" className={styles.form}>
                    <Select value={questionType} onChange={(value) => {
                        setQuestionType(value);
                        setMediaContent("");
                        setSolutionContent("");
                    }}>
                        {Object.values(QuestionTypes).map((value, index) => (
                            <Option key={index} value={value}>{value}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="caption" label="Caption" className={styles.form}>
                    <Input.TextArea onChange={(event) => setCaption(event.target.value)} value={caption} maxLength={100} />
                </Form.Item>
                {questionType !== QuestionTypes.Sort && <Form.Item label="Time" className={styles.form}>
                    <Form.Item name="time">
                        <InputNumber defaultValue={time} value={time} onChange={(value) => setTime(value)} style={{ width: "30%" }} min={30} max={300} />
                        <span className="ant-form-text"> seconds</span>
                    </Form.Item>
                </Form.Item>}
                <Form.Item label="Value" className={styles.form}>
                    <Form.Item name="switch" label="Joker" valuePropName="checked">
                        <Switch defaultChecked={false} onChange={(value) => setHasJokerValue(value)} />
                    </Form.Item>
                    {hasJokerValue ?
                        <Form.Item label="Select Joker">
                            <Select onChange={(value) => setJoker(value)} value={joker}>
                                {Object.values(Jokers).map((value, index) => (
                                    <Option key={index} value={value}>{value}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        :
                        <Form.Item label="Choose Number Value" name="input-number">
                            <Slider defaultValue={questionValue} value={questionValue} onChange={(value) => setQuestionValue(value)} min={1} max={10}/>
                        </Form.Item>
                    }
                </Form.Item>
                {[QuestionTypes.Video, QuestionTypes.Hearing, QuestionTypes.Image, QuestionTypes.Quote].includes(questionType) ? <Form.Item label="Media" className={styles.form}>
                        {questionType === QuestionTypes.Quote ?
                            <Input.TextArea value={mediaContent} onChange={(event) => setMediaContent(event.target.value)} placeholder={"Rosen sind rot..."} maxLength={100} />
                            : questionType === QuestionTypes.Video || questionType === QuestionTypes.Hearing ?
                                <Input value={mediaContent} onChange={(event) => setMediaContent(event.target.value)} placeholder={"Enter a URL to a Video or Audio File"} />
                                :
                                <Form.Item>
                                    <>
                                        <Upload
                                            customRequest={async (req) => {
                                                const data = new FormData();
                                                data.set("image", req.file);
                                                const res = await axios.post("https://api.imgur.com/3/upload", data, { headers: { 'Authorization': `Client-ID b6fc4610962fa99` } });
                                                console.log(res);
                                                const { id, link } = res.data.data;
                                                setImageFileList([...imageFileList, { uid: v4(), name: id, url: link }])
                                            }
                                            }
                                            listType="picture-card"
                                            fileList={imageFileList}
                                        >
                                            {imageFileList.length >= 8 ? null : uploadButton}
                                        </Upload>
                                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel} style={{ width: '100%', height: "100%" }}>
                                            <Image layout={"fill"} objectFit={"contain"} alt="example"  src={previewImage} />
                                        </Modal>
                                    </>
                                </Form.Item>
                        }
                    </Form.Item>
                    :
                    questionType === QuestionTypes.Choice ?
                        <Form.Item label="Choices" className={styles.form}>
                            {choices.map((value, index) => (
                                <Input key={index} value={value} onChange={(event) => {
                                    choices[index] = event.target.value;
                                    setChoices([...choices])
                                }} />
                            ))}
                        </Form.Item>
                        : questionType === QuestionTypes.Sort &&
                        <Form.Item label="Items to Sort" className={styles.form}>
                            <Form.Item style={{ width: "100%" }}>
                                <Input style={{ width:" 45%" }} onChange={(event) => setUnit(event.target.value)} placeholder="m/s" value={unit} />
                                <InputNumber style={{ width: "30%" }} onChange={(value) => {
                                    if (value > sortItems.length) {
                                        for (let i = sortItems.length; i < value; i++) sortItems.push({ name: "", value: 0 });
                                    } else {
                                        sortItems.splice(value, sortItems.length - value);
                                    }
                                    setSortItems([...sortItems]);
                                }} value={sortItems.length} min={1} max={10} />
                            </Form.Item>
                            <Form.Item>
                                {sortItems.map((e, index) => (
                                    <>
                                        <Input onChange={(event) => {
                                            sortItems[index].name = event.target.value;
                                            setSortItems([...sortItems]);
                                        }} value={e.name} style={{ width: "45%" }} placeholder="Item Name"/>
                                        <InputNumber onChange={(value) => {
                                            sortItems[index].value = value;
                                            setSortItems([...sortItems]);
                                        }} value={e.value} style={{ width: "45%" }} />
                                    </>
                                ))}
                            </Form.Item>
                        </Form.Item>
                }
                {questionType === QuestionTypes.Guesstimate ?
                    <Form.Item label="Correct Guess" className={styles.form}>
                        <InputNumber value={Number(solutionContent)} onChange={(value) => setSolutionContent(String(value))} style={{ width: "100%" }} placeholder="Enter Number" size={"large"}/>
                    </Form.Item>
                    : questionType === QuestionTypes.Choice ?
                        <Form.Item label="Correct Choice" className={styles.form}>
                            <Select value={choices[Number(solutionContent)]} onChange={(value) => setSolutionContent(String(choices.indexOf(value)))}>
                                {choices.map((value, index) => (
                                    <Option key={index} value={value}>{value}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        :
                        questionType !== QuestionTypes.Sort &&
                        <Form.Item label="Solution" className={styles.form}>
                            <Radio.Group style={{ marginBottom: 20 }} value={solutionType} onChange={(event) => setSolutionType(event.target.value) }>
                                {Object.values(SolutionTypes).map((type, index) => (
                                    <Radio key={index} value={type}>{type}</Radio>
                                ))}
                            </Radio.Group>
                            {solutionType === SolutionTypes.List && <InputNumber onChange={(value) => {
                                if (value > solutionList.length) {
                                    for (let i = solutionList.length; i < value; i++) solutionList.push("");
                                } else {
                                    solutionList.splice(value, solutionList.length - value);
                                }
                                setSolutionList([...solutionList])
                            }
                            } value={solutionList.length} min={1} max={8} />}
                            {solutionType === SolutionTypes.Text ?
                                <Form.Item>
                                    <Input value={solutionContent} onChange={(event) => setSolutionContent(event.target.value)} style={{ width: "100%" }} placeholder={"Item Name"}/>
                                </Form.Item>
                                :
                                solutionType === SolutionTypes.Image ? <Form.Item>
                                        <>
                                            <Upload
                                                customRequest={async (req) => {
                                                    const data = new FormData();
                                                    data.set("image", req.file);
                                                    const res = await axios.post("https://api.imgur.com/3/upload", data, { headers: { 'Authorization': `Client-ID b6fc4610962fa99` } });
                                                    console.log(res);
                                                    const { id, link } = res.data.data;
                                                    setSolutionFile([{ uid: v4(), name: id, url: link }])
                                                }
                                                }
                                                listType="picture-card"
                                                fileList={solutionFile}
                                            >
                                                {uploadButton}
                                            </Upload>
                                            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel} style={{ width: '100vw', height: "100vh" }}>
                                                <Image layout={"fill"} objectFit={"contain"} alt="example" src={previewImage}  />
                                            </Modal>
                                        </>
                                    </Form.Item>
                                    :
                                    <Form.Item>
                                        {solutionList.map((e, index) => (
                                            <Input value={e} onChange={(event) => {
                                                solutionList[index] = event.target.value;
                                                setSolutionList([...solutionList]);
                                            }} key={index} style={{ width: "100%" }} placeholder={"Solution Part " + index}/>
                                        ))}
                                    </Form.Item>
                            }
                        </Form.Item>}
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button style={{ background: "var(--accent)", width: "100%", border: "none" }} onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <div style={{ width: "40%", display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <div style={{ display: "grid", gridTemplateRows: "1fr 10fr", width: "80%", height: 600 }}>
                    <div style={{ width: "100%", borderBottom: "1px solid #222", background: "#333", borderRadius: "4px 4px 0 0", color: "var(--text)", padding: 20, fontSize: "1.4em", fontStyle: "bold" }}>
                        Preview
                    </div>
                    <div style={{ background: "#333" }}>
                        <QuestionWrapper fontSize={8} hideTimer={true} hideOverlay={true} question={{ unit, sortElements: sortItems, choices, jokerReward: hasJokerValue ? joker : undefined, media: { type: getMediaTypeByQuestionType(questionType) ?? MediaTypes.Text, content: mediaContent !== "" ? mediaContent :  ".", sources: solutionList.length > 0 ? solutionList : [] } , topic, type: questionType, caption, timeInSeconds: time, value: hasJokerValue ? -1 : questionValue, solutionType, solution: solutionContent }} />
                    </div>
                </div>
            </div>
        </div>

    )
}