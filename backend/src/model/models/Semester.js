module.exports = class {
  id = null;
  year = null;
  season = null;
  active = null;

  constructor(data) {
    if (
      data.sem_id === 0 ||
      data.sem_id === undefined ||
      data.sem_id === null
    ) {
      //console.error('Semester ID null');
      throw Error('Semester ID null');
    }
    if (!data.sem_year) {
      //console.error('Semester year null');
      throw Error('Semester year null');
    }
    if (!data.sem_season) {
      //console.error('Semester season null');
      throw Error('Semester season null');
    }
    if (data.sem_active === undefined || data.sem_active === null) {
      //console.error('Semester active null');
      throw Error('Semester active null');
    }

    this.id = data.sem_id;
    this.year = data.sem_year;
    this.season = data.sem_season;
    this.active = data.sem_active;
  }
};
