import {useState} from "react";
import {Topics} from "../../../data/topics";
import Question, {getMediaTypeByQuestionType, QuestionTypes, SolutionTypes} from "../../../types/questions";
import {Jokers} from "../../../data/jokers";
import {Button, Form, Input, InputNumber, Radio, Select, Slider, Switch, UploadFile} from "antd";
import Media, {MediaTypes} from "../../../types/media";
import styles from "../../../styles/form.module.css";
import QuestionWrapper from "../index";
import MediaUpload from "./media-upload";
import {Category} from "../../../types/questions/categorize-question";
import CategoryInput from "./category-input";
import SortInput from "./sort-input";

const { Option } = Select;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
}

export default function Index({ question, onSubmit }: { question?: Question, onSubmit: (question: Question) => void }) {
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
    const [categories, setCategories] = useState<Category[]>((question && question.categories) ? question.categories : []);

    async function handleSubmit() {
        const question: Question = {
            topic,
            type: questionType,
            caption,
            timeInSeconds: questionType === QuestionTypes.Sort || questionType === QuestionTypes.Categorize ? -1 : time,
            value: hasJokerValue ? -1 : questionValue,
            jokerReward: hasJokerValue ? joker : undefined,
            solution: solutionContent !== "" ? solutionContent : solutionFile[0] && solutionFile[0].url ? solutionFile[0].url : "...",
            solutionType,
            solutionArray: solutionType === SolutionTypes.List ? solutionList : undefined,
        }
        switch (question.type) {
            case QuestionTypes.Hearing:
            case QuestionTypes.Video:
            case QuestionTypes.Image:
            case QuestionTypes.Quote:
                const mediaType = getMediaTypeByQuestionType(questionType);
                const media: Media | undefined = mediaType ? { type: mediaType, content: mediaContent !== "" ? mediaContent : undefined, sources: imageFileList.length > 0 ? imageFileList.map((file) => file.url!) : undefined } : undefined;
                onSubmit({...question, media});
                return;
            case QuestionTypes.Sort:
                onSubmit({...question, unit, sortElements: sortItems});
                return;
            case QuestionTypes.Choice:
                onSubmit({ ...question, choices });
                return;
            case QuestionTypes.Categorize:
                onSubmit({ ...question, categories });
        }
        onSubmit(question);
    }

    return (
        <div style={{ background: "#222", width: "100vw", height: "100vh", color: "white", display: "flex", alignItems: "center", gridTemplateColumns: "60% 40%", overflow: "hidden" }}>
            <Form name="Add Question" style={{ overflowY: "auto", height: "100%", padding: 10, color: "white", fontSize: "2rem", width: "60%" }} {...formItemLayout}>
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
                {questionType !== QuestionTypes.Sort && questionType !== QuestionTypes.Categorize && <Form.Item label="Time" className={styles.form}>
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
                            <Input.TextArea value={mediaContent} onChange={(event) => setMediaContent(event.target.value)} placeholder={"Rosen sind rot..."} maxLength={200} />
                            : questionType === QuestionTypes.Video || questionType === QuestionTypes.Hearing ?
                                <Input value={mediaContent} onChange={(event) => setMediaContent(event.target.value)} placeholder={"Enter a URL to a Video or Number of Audio File (Upload currently not supported)"} />
                                :
                                <MediaUpload files={imageFileList} setFiles={setImageFileList} />
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
                        : questionType === QuestionTypes.Categorize ? <CategoryInput categories={categories} setCategories={setCategories} />
                        : questionType === QuestionTypes.Sort && <SortInput unit={unit} setUnit={setUnit} sortItems={sortItems} setSortItems={setSortItems} />
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
                        questionType !== QuestionTypes.Sort && questionType !== QuestionTypes.Categorize &&
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
                            } value={solutionList.length} min={1} max={10} />}
                            {solutionType === SolutionTypes.Text ?
                                <Form.Item>
                                    <Input value={solutionContent} onChange={(event) => setSolutionContent(event.target.value)} style={{ width: "100%" }} placeholder={"Item Name"}/>
                                </Form.Item>
                                :
                                solutionType === SolutionTypes.Image ?
                                    <MediaUpload files={solutionFile} setFiles={setSolutionFile} />
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
