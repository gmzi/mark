export default function NestedTable({ data }) {
    return (
        <td>
            <div dangerouslySetInnerHTML={{ __html: data }} />
        </td>
    )
}