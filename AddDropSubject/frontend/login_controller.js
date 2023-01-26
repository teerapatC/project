//Web And API Settings
const LoginAPIurl = 'http://localhost:3000/auth/login';

//Send Login Data To API
async function postLogin(data) {

    const response = await fetch(LoginAPIurl, {
        method: 'POST',
        //mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
		credentials: "include",
		headers: {
			'Content-Type': 'application/json',
			'appkey': 'Lh%TvmX@FW5@%@cWVUpENqm44kEX!78@L3dc94G#^biU5G@9rPnX@%i4pCtpa87^4ruXUmC78FKVh*tBrZFAt%iPM72RanfjwgTV&TWC$pPE^Jhac5MWnd$s7hFr%$aS',
		},
		body: JSON.stringify(data),
    });

    const resjson = await response.json();
	console.log(resjson);
    return resjson;
}

function main() {
    //Get Email And Password
    const data = {
        id : document.getElementById('email').value,
        password : document.getElementById('password').value,
    };

    postLogin(data)
        .then(data => {
            if(data.login == 0) {
                const error = document.getElementById('errorAlert');
                let output = document.createElement('div');
                output.innerHTML = '<div class="alert alert-danger" role="alert">Please check your email or password!! </div>';
                error.append(output);
                setTimeout(function() {
                    output.remove();
                }, 1000);
            }else {
                console.log(data.datas.email);
                if(data.datas.email) window.location.href = 'AddWit.html';
                else window.location.href = 'Approve_page.html';
            }   
            
        });
}
