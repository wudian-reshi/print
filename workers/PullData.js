addEventListener('message', (e) => {
    request(e.data);
}, false);

function request(data) {
    fetch('http://192.168.1.176:81/api/tags', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
    }).then(res => res.json())
        .catch(error => {
            postMessage({
                isSuccess: false,
                message: `${data.code}数据拉取失败, 将于稍后重试!`
            })
        })
        .then(response => {
            console.log('数据拉取成功!', response)
            if (response.code === 0) {
                postMessage({
                    isSuccess: true,
                    message: `${data.code}数据拉取完成!`,
                })
            } else {
                postMessage({
                    isSuccess: false,
                    message: response.message,
                })
            }
        });
}