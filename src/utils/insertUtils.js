export async function insertData(data,url,token){
    const options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
        },
        body: JSON.stringify(data),
    };
    
    const response = await fetch(url, options);
    const returnData = await response.json();
    if (response.ok) {
        console.log(data)
    }
    return returnData;
}