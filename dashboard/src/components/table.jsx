export default function Table({ tableHead, tableBody, tableClassName, TagName = 'div', ...props }) {
/*
*Interface für Tables
*/
    return (
        <>
            <TagName {...props}>
                <table className={tableClassName}>
                    <thead>
                        <tr>
                            {tableHead}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {tableBody}
                        </tr>
                    </tbody>
                </table>
            </TagName>

        </>
    )

}




