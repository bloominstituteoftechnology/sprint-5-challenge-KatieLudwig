
async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

 // tests 1-6 pass
 /* test 7 "no learner is selected" ✅
  test 8 container holds 16 cards ✅
  test 9 each card has a single class name ✅
  test 10 inside each card displays the proper name ✅
  test 11 inside each card displays the proper email ✅
  test 12 inside each card displays the text "Mentors" ✅
  test 13 inside each card displays the correct number of mentors ✅
  test 14 inside each card displays the correct mentor names ✅
  test 15 the mentors are hidden on page load ✅
  test 16 clicking on a card toggles a class of 'selected' on it ❌
  test 17 selecting a card displays the text "The selected learner is <name>" ✅
  test 18 de- selecting all cards displays the text "no learner is selected" ❌
  test 19 clicking on a card de-selects any other card that may be selected ✅
*/

  const info = document.querySelector('p')
  info.textContent = "Fetching learner cards..."

  let learnerURL = 'http://localhost:3003/api/learners'
  let mentorURL = 'http://localhost:3003/api/mentors'


  
  function buildLearnerCards(learner) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const nameH3 = document.createElement('h3');
    nameH3.textContent = learner.fullName;

    const emailDiv = document.createElement('div');
    emailDiv.textContent = learner.email;

    const mentorsH4 = document.createElement('h4');
    mentorsH4.textContent = 'Mentors';
    mentorsH4.classList.add('closed');

    const mentorsUl = document.createElement('ul');

    let mentors = learner.mentors;
    
    mentors.forEach(mentor => {
      const listLi = document.createElement('li');
      const open = document.createElement('button')
      const close = document.createElement('button')
      listLi.textContent = mentor;
      mentorsUl.appendChild(listLi);
      // mentorsUl.appendChild(open)
      // mentorsUl.appendChild(close)
    });


    [nameH3, emailDiv, mentorsH4, mentorsUl].forEach(p => {
      card.appendChild(p);
    });
   
    //cards.appendChild(card);
    
    card.addEventListener('click', () => {
      // Check if the clicked card is already selected
      if (card.classList.contains('selected')) {
        // If it is, remove 'selected' class and update 'info' text content
        card.classList.remove('selected');
        info.textContent = "No learner is selected";
        nameH3.textContent = learner.fullName;
      } else {
        // If it's not, remove 'selected' class from all cards
        document.querySelectorAll('.card').forEach(card => {
          card.classList.remove('selected');
        });
        // Add 'selected' class to the clicked card and update 'info' and 'nameH3' text content
        card.classList.add('selected');
        info.textContent = `The selected learner is ${learner.fullName}`
        nameH3.textContent = learner.fullName + `, ID: ${learner.id}`;
      }
    });
    // card.addEventListener('click', () => {
    //   document.querySelectorAll('.card').forEach(card => {
    //     card.classList.remove('selected');
    //     info.textContent = `The selected learner is ${learner.fullName}`
        
    //     nameH3.textContent = learner.fullName;
    //   });
    //   card.classList.add('selected');
    //   nameH3.textContent = learner.fullName + `, ID: ${learner.id}`;
    // });

    mentorsH4.addEventListener('click', () => {
      document.querySelectorAll('h4')
        mentorsH4.classList.toggle('closed');
        mentorsH4.classList.toggle('open');
    });

    return card
  }

  // Main Code
  let promise1 = axios.get(learnerURL);
  let promise2 = axios.get(mentorURL);
  Promise.all([promise1, promise2]).then(response => {
    info.textContent = "No learner is selected";
    // console.log(response);
    let learners = response[0];
    let mentors = response[1];

    // console.log("Learners: ", learners.data);
    // console.log("Mentors: ", mentors.data);

    // Create new total learner object
    let new_learners = []

    // Loop through (iterate) over each leaner
    //for learner in learners.data:
    // Create Mentor Map
    const mentorMap = new Map(mentors.data.map(mentor => { 
      const fullName = `${mentor.firstName} ${mentor.lastName}`; 
      return [mentor.id, fullName];
    }));
      // Create new leaner
    learners.data.forEach((learner => { 
      let learner_obj = {
        "fullName": "",
        "email": "",
        "id": "",
        "mentors": []
      }
    
      learner_obj.fullName = learner.fullName;
      learner_obj.email = learner.email;
      learner_obj.id = learner.id;
      
      learner_obj.mentors = learner.mentors.map(mentorId => mentorMap.get(mentorId));
      new_learners.push(learner_obj);
    }));
    new_learners.forEach(learner => {
      const card = buildLearnerCards(learner);
      document.querySelector('div').appendChild(card);
    })

    }), err => {
      info.textContent = "Uh Oh there was a problem" + err.response.data.message
    console.log(err)
    return err
    }

    // document.addEventListener('click', evt => {
    //   if (evt.target === document.querySelector('selection')) {
    //     const learners = document.querySelectorAll('.card')
    //     info.textContent = "No learner is selected";
    //     learners.forEach(card => card.classList.remove('selected')) 
    //   }
    // })



      //for mentor in learner.mentors:
      // learner.mentors.forEach((mentor) =>{
      //   let mentor_obj = {
      //     "id": "",
      //     "firstName": "",
      //     "lastName": ""
      //   }
      //   mentor.id;
      //   mentors.data.forEach((mentor) =>{

      //   // do after id is found
      //   mentor_obj.id = mentor.id;
      //   mentor_obj.firstName = mentor.firstName;
      //   mentor_obj.lastName = mentor.lastName;
      //   learner_obj.mentors.push(mentor_obj);
      // })
    
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
