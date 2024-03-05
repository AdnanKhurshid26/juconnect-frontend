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
    if (response.ok) {
        const data = await response.json();
        console.log(data)
    }
    return data;
}