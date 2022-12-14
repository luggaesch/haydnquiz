import styles from "../../../styles/form.module.css";
import {Form, Input, InputNumber} from "antd";
import {useState} from "react";
import {SortElement} from "../../../types/questions/sort-question";

export default function SortInput({ unit, sortItems, setUnit, setSortItems }: { unit: string, sortItems: SortElement[], setUnit: (unit: string) => void, setSortItems: (sortItems: SortElement[]) => void }) {

    return (
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
                        {unit === "date" ?
                            <Input onChange={(event) => {
                                sortItems[index].value = Date.parse(event.target.value);
                                setSortItems([...sortItems]);
                            }} value={e.value} style={{ width: "45%" }} />
                            :
                            <InputNumber onChange={(value) => {
                                sortItems[index].value = value;
                                setSortItems([...sortItems]);
                            }} value={e.value} style={{ width: "45%" }} />}
                    </>
                ))}
            </Form.Item>
        </Form.Item>
    )
}