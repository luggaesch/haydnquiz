import {Category} from "../../../types/questions/categorize-question";
import styles from "../../../styles/form.module.css";
import {Form, Input, InputNumber} from "antd";
import {useEffect} from "react";

export default function CategoryInput({ categories, setCategories }: { categories: Category[], setCategories: (categories: Category[]) => void }) {

    useEffect(() => {
        console.log(categories);
    }, [categories]);

    function handleNumberOfCategoryNamesChanged(value: number) {
        const currentCategories = [...categories];
        if (value > categories.length) {
            currentCategories.push({ name: "", items: [...Array(currentCategories[0]?.items.length ?? 1)].map(() => "") })
        } else if (value < categories.length) {
            currentCategories.splice(currentCategories.length - 1, 1);
        }
        setCategories(currentCategories);
    }

    function handleNumberOfCategoryItemsChanged(value: number) {
        const currentCategories = [...categories];
        if (!currentCategories[0]) return;
        if (value > categories[0].items.length) {
            currentCategories.forEach((category) => {
                category.items = [...category.items, ...[...Array(value - category.items.length)].map(() => "")];
            });
        } else if (value < categories[0].items.length) {
            currentCategories.forEach((category) => {
                category.items.splice(category.items.length - value, category.items.length - value);
            });
        }
        setCategories(currentCategories);
    }

    return (
        <Form.Item label="Categories" className={styles.form}>
            <Form.Item style={{ width: "100%" }}>
                <InputNumber onChange={handleNumberOfCategoryNamesChanged} value={categories.map((c) => c.name).length} />
                <InputNumber onChange={handleNumberOfCategoryItemsChanged} value={categories.map((c) => c.items)[0]?.length ?? 0} />
            </Form.Item>
            <Form.Item>
                {categories.map((category, index) => {
                    return (
                        <div key={index} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
                            <Input onChange={(event) => {
                                const currentCategories = [...categories];
                                currentCategories[index].name = event.target.value;
                                setCategories(currentCategories);
                            }
                            } placeholder="Category Name" style={{ height: 31 }} value={category.name} />
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                {category.items.map((item, innerIndex) => (
                                    <Input onChange={(event) => {
                                        const currentCategories = [...categories];
                                        currentCategories[index].items[innerIndex] = event.target.value;
                                        setCategories(currentCategories);
                                    }
                                    } placeholder="Item Name" key={innerIndex} value={item} />
                                ))}
                            </div>
                        </div>
                    )
                })}
            </Form.Item>
        </Form.Item>
    )
}