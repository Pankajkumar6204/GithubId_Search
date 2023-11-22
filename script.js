const apiUrl = 'https://api.github.com/users/';
const main = document.querySelector('.main')

// get user using github api !!
const getUser =async (username) =>{
    const response =await fetch(apiUrl + username);
    console.log(response);
    const data = await response.json();
    console.log(data)
    const card = `
    <div class="card">
        <div>
            <img class="avatar" src=${data.avatar_url} alt="">
        </div>
        <div class="user-info">
            <h2>${data.name}</h2>
            <p>${data.bio}</p>
    
            <ul class="info">
                <li>${data.followers} <strong class="info-name">Followers</strong></li>
                <li>${data.following} <strong class="info-name">Following</strong></li>
                <li>${data.public_repos} <strong class="info-name">Repos</strong></li>
            </ul>
    
            <div id="repos">
            
            </div>
        </div>
    </div>
    `
    main.innerHTML = card;
    getRepos(username)
}
// init call
getUser('pankajkumar6204');

// display on windows his api data !! 
const getRepos = async(username) =>{
    const repos = document.querySelector('#repos')
    const response =await fetch(apiUrl + username + '/repos')
    const data = await response.json();
    console.log(data)
    data.forEach(
        (item) =>{
            const elem = document.createElement('a')
            elem.classList.add('repo')
            elem.href = item.html_url;
            elem.innerText = item.name;
            elem.target = '_blank'
            repos.appendChild(elem)
        }
    )
}

// search any github username !!
const searchBox = document.querySelector('.search')
const formSubmit = () =>{
    if(searchBox.value != ""){
        getUser(searchBox.value);
        searchBox.value = '';
    }
    return false;
}

// if searchbox focus off then automatic username search !!
searchBox.addEventListener('focusout', function() {
    formSubmit()
})


{/* <a class="repo" href="#" target="_blank">repo1</a>
<a class="repo" href="#" target="_blank">Repo2</a>
<a class="repo" href="#" target="_blank">Repo3</a>  */}
