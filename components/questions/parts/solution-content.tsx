import {SolutionTypes} from "../../../types/question";

export default function SolutionContent({ type, text, array }: { type: SolutionTypes, text: string, array?: string[]}) {
    return (
        <div>{type}</div>
    )
}