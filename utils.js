export function calcDistanceToBirthday(personToCalculate) {
  function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  const year = calculate_age(new Date(personToCalculate.birthday)) + 1;
  const newDate = new Date(personToCalculate.birthday);
  const month = newDate.toLocaleString('default', { month: 'long' });
  const dayBirthday = newDate.getDate();
  // calculate birday day in between
  const birthday = new Date(personToCalculate.birthday);
  const today = new Date();
  //Set current year or the next year if you already had birthday this year
  birthday.setFullYear(today.getFullYear());
  if (today > birthday) {
    birthday.setFullYear(today.getFullYear() + 1);
  }

  //Calculate difference between days
  const daysToBirthday = Math.floor((birthday - today) / (1000 * 60 * 60 * 24))

  personToCalculate.birthdayDay = dayBirthday
  personToCalculate.birthdayMonth = month
  personToCalculate.futureAge = year
  personToCalculate.distanceToBirthday = daysToBirthday
  console.log(personToCalculate);
  return personToCalculate

}