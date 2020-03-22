class Records {
  constructor() {
    this.baseurl = '/api/v1/records';
    this.records = [];
    this.$form = document.querySelector('.record-form');
  }

  /**
   * initialize
   */
  async init() {

    this.$form.addEventListener('submit', async (evt) => {
      evt.preventDefault();
      await this.create();
    });

  }


  /**
   * Send new row info to the table using
   * POST request
   */
  async create() {
    try {
      // TODO if empty throw error or warning to UI
      const dateFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const dateTimeFormat = new Intl.DateTimeFormat('en-GB', dateFormatOptions);
      console.log(dateTimeFormat.format(new Date()));
      const newData = {
        newUserInput: this.$form.userInput.value,
        status: 192,
        date: dateTimeFormat.format(new Date()),
      };
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      };
      let data = await fetch(this.baseurl, options);
      data = await data.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  const records = new Records();

  await records.init();
});
