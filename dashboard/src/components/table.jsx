export default function Table({ tableHead, tableBody, tableFooter, tableCaption, tableClassName, TagName = 'div', ...props }) {
/*
*@description
*Interface für Tables
*@authort Fabian Tappendorf
*/
    return (
        <>
            <TagName {...props}>
                <table className={tableClassName} {...props}>
                    {tableCaption && <caption className="caption-bottom italic text-sm p-2">{tableCaption}</caption>}
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




