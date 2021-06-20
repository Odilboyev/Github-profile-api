// jshint esversion: 9
document.getElementById('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    getAvatar();
});
async function getAvatar() {
    let username = document.querySelector('input#username').value;

    let githubUrl = `https://api.github.com/users/${username}`;

    let githubResponse = await fetch(githubUrl);

    let githubUser = await githubResponse.json();

    let div = document.getElementById('userData');

    div.innerHTML = '';

    let githubAvatar = githubUser.avatar_url;

    let card = document.createElement('div');
    card.className = 'card';

    if (githubUser.message !== "Not Found"){
        card.innerHTML = `
            <div class="card-img">
                <img src="${githubAvatar}">
            </div>
            <div class="desc">
                <h6 class="primary-text">${githubUser.name}</h6>
                <h6 class="secondary-text">${githubUser.login}</h6>
            
                <h6 class="primary-text"> ${githubUser.bio} </h6>
                <h6 class="primary-text">Location: ${githubUser.location} </h6>
                
                <div class="details">
                <div class="rating">
                    <h4 class="primary-text"> ${githubUser.followers} </h4>
                    <h4 class="secondary-text"> Followers </h4>
                </div>
                <div class="activity">
                    <h4 class="primary-text"> ${githubUser.following} </h4>
                    <h4 class="secondary-text"> Following </h4>
                </div>
            </div>
                
            </div>

            <button class="primary-text"><a href="${githubUser.html_url}" target="_blank" >View Profile</a></button> 
        `;
    } else{
        card.innerHTML = '<h2>Please, enter username correctly</h2>';
    }

    div.appendChild(card);

    console.log(githubUser.message);
}