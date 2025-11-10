const TableHeader = ({ data }) => {
  if (!data || data.length === 0) return null

  // Standardspalten
  const headers = ['Name']

  // maximale Anzahl an Tests in allResults
  const maxResults = Math.max(...data.map(item => item.allResults?.length || 0))

  // Dynamische Spalten für jeden Test
  for (let i = 0; i < maxResults; i++) {
    headers.push(`Test ${i + 1}`)
  }

  headers.push('Actions')

  return (

    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index}>{header}</th>
        ))}
      </tr>

    </thead>

  )
}

const TableBody = ({ characterData, addTestToCharacter, removeCharacter }) => {
  return (
    <tbody>
      {characterData.map((row, index) => {
        // Array von Test-Werten, eventuell kürzer als maxResults
        const tests = row.allResults?.map(r => r.test) || []

        // Alle Tests auffüllen, falls weniger als maxResults
        const maxResults = Math.max(...characterData.map(c => c.allResults?.length || 0))
        while (tests.length < maxResults) {
          tests.push('-'); // Platzhalter für leere Spalten
        }

        return (
          <tr key={index}>
            <td>{row.name}</td>
            {tests.map((test, tIndex) => (
              <td key={tIndex}>{test}</td>

            ))}
            <td>

              <button
                type="button"
                className="btn btn-success"
                onClick={() => addTestToCharacter(index, "Passed")}
              >
                Passed
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => addTestToCharacter(index, "Failed")}
              >
                Failed
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => addTestToCharacter(index, "Passed after help")}
              >
                Passed after help
              </button>
              <button class="btn btn-secondary" onClick={() => removeCharacter(index)}>Delete</button>
            </td>
          </tr>
        )
      })}
    </tbody>
  )
}


const Table = (props) => {
  const { characterData, addTestToCharacter, removeCharacter, downloadJSON } = props

  return (
    <>
      <h1>Dashboard</h1>
      <table className="table table-bordered">
        <TableHeader data={characterData} />
        <TableBody characterData={characterData} addTestToCharacter={addTestToCharacter} removeCharacter={removeCharacter} />
      </table>
      <button onClick={downloadJSON} className="btn btn-primary mb-3">
        Download JSON
      </button>
    </>
  )
}

export default Table