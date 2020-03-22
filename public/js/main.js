class Records {
  constructor() {
    this.baseurl = '/api/v1/records';
    this.records = [];
    this.$form = document.querySelector('.record-form');
    this.$records = document.querySelector('.log-list');
    this.recordNum = 0;
  }

  /**
   * initialize
   */
  async init() {
    await this.updateRecords();

    this.$form.addEventListener('submit', async (evt) => {
      evt.preventDefault();
      await this.create();
    });

  }

  /**
   * updateTodos
   * GET & rerender()
   */
  async updateRecords() {
    await this.getTodos();
    this.renderTodos();
  }

  /**
   * getTodos
   * GET
   */
  async getTodos() {
    let data = await fetch(this.baseurl);
    data = await data.json();
    this.records = data;
    await this.renderTodos();
  }

  /**
   * DOM rendering of the todos
   */
  renderTodos() {
    this.$records.innerHTML = '';
    this.records.forEach(item => {
      this.$records.innerHTML += `
        <li class="record-item" id="${item._id}">
          <p>${item.date} ${item.userFeelings} ${item.status}</p>
        </li>
      `;
    });
  }


  /**
   * Send new row info to the table using
   * POST request
   */
  async create() {
    var date = new Date();
    date.setDate(date.getDate() + this.recordNum);
    this.recordNum = this.recordNum + 1;
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateTimeFormat = new Intl.DateTimeFormat('en-GB', dateOptions);
    try {
      // TODO if empty throw error or warning to UI. Or update existing record
      const newData = {
        newUserInput: this.$form.userInput.value,
        status: 192,
        date: dateTimeFormat.format(date),
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
