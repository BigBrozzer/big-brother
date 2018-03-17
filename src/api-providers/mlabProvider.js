const getPostConfig = (data) => ({
    body: JSON.stringify(data),
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
});

const getMLabConfig = ({ dbName, collName, apiKey }) => {
    const mlabApi = `https://api.mlab.com/api/1/databases/${dbName}/collections/${collName}`;
    const queryParams = `apiKey=${apiKey}`;

    return {
        getRecord: (id) => fetch(`${mlabApi}/${id}?${queryParams}`)
            .then(response => response.json())
            .catch(e => console.warn('Failed getRecord', e)),
        sendRecord: (data) => fetch(`${mlabApi}?${queryParams}`, getPostConfig(data))
            .then(response => response.json())
            .then(data => data['_id']['$oid'])
            .catch(e => console.warn('Failed sendRecord', e))
        ,
    };
};

export default getMLabConfig;
