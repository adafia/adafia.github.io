
function renderDate() {
  let experience = document.querySelector('.experience');

  const getExperienceInYears = (startDate, dateToCalculate = new Date()) => {
      const dob = new Date(startDate).getTime();
      const dateToCompare = new Date(dateToCalculate).getTime();
      const age = (dateToCompare - dob) / (365 * 24 * 60 * 60 * 1000);
      return Math.floor(age);
  };

  experience.append(getExperienceInYears('01/03/2018'))
}



// Function calls
renderDate()