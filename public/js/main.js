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
   * updateRecords
   * GET & rerender()
   */
  async updateRecords() {
    await this.getRecords();
    this.renderRecords();
  }

  /**
   * getRecords
   * GET
   */
  async getRecords() {
    let data = await fetch(this.baseurl);
    data = await data.json();
    this.records = data;
    await this.renderRecords();
  }

  /**
   * deleteRecord
   * DELETE
   * @param {*} id 
   */
  async delete(id) {
    try {
      const options = {
        method: 'DELETE'
      };
      let data = await fetch(this.baseurl + `/${id}`, options);
      data = await data.json();
      this.updateRecords();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * DOM rendering of the records
   */
  renderRecords() {
    this.$records.innerHTML = '';
    this.records.forEach(item => {
      this.$records.innerHTML += `
        <li class="record-item" id="${item._id}">
          <form class="item__form">
            <input type="text" name="record" value="${item.userFeelings}">
          </form>
          <p>${item.date} ${item.userFeelings} ${item.status}</p>
          <button class="item__delete">delete</button> | <button class="item__edit">edit</button>
        </li>
      `;
    });

    // add listener to update or delete
    document.querySelectorAll('.record-item').forEach(item => {
      item.addEventListener('click', this.handleEditOrDelete.bind(this));
    });
  }

  /**
   * handle the edit or delete button
   * @param {} evt 
   */
  async handleEditOrDelete(evt) {
    {
      const $clickedButton = evt.target;
      const $listItem = evt.currentTarget;

      if ($clickedButton.classList.contains('item__delete')) {
        await this.delete($listItem.id);
        console.log('delete', $listItem, $listItem.id);
      } else if ($clickedButton.classList.contains('item__edit')) {
        const form = $listItem.firstElementChild;
      }
    }
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
