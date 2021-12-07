const httpRequest = async (url: string, options: {method: string} = {method: 'GET'}) => {
    let response =  await fetch(url, options);

    return response.json();
}

export default httpRequest;
