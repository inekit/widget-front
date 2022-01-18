<template>
  <div class="editor" v-if="isShown">
    <form
      @submit="$root.formData.id ? alterWidget($event) : addWidget($event)"
      class="w-100 h-100"
    >
      <div style="height:50px">
        <button
          type="button"
          @click="
            isShown = false
            WO = []
          "
          class="btn btn-secondary"
        >
          Назад
        </button>
        <button type="submit" class="btn btn-primary">Подтвердить</button>
      </div>
      <div style="height: calc(100vh - 50px);" class="row w-100">
        <div class="params p-3 overflow-auto h-100">
          <h3>Внешний вид</h3>
          <div class="form-group">
            <label for="inputName">Название виджета</label>
            <input
              type="input"
              class="form-control"
              v-model="widgetForm.widget.name"
              id="inputName"
              pattern="^[a-zA-ZА-Яа-я0-9\s]{1,40}$"
              placeholder="Введите что-нибудь"
              required
            />
          </div>
          <div class="form-group">
            <label for="inputText">Текст на виджете</label>
            <input
              type="input"
              class="form-control"
              v-model="widgetForm.widget.header"
              id="inputText"
              placeholder="Введите что-нибудь"
              pattern="^[a-zA-ZА-Яа-я0-9\s]{1,10}$"
              required
            />
          </div>
          <div class="form-group">
            <label for="areaDescription"
              >Описание (видно на раскрытои варианте)</label
            >
            <textarea
              class="form-control"
              v-model="widgetForm.widget.description"
              id="areaDescription"
              rows="3"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="inputColor">Цвет фона</label>
            <input
              type="color"
              id="inputColor"
              v-model="widgetForm.widget.b_color"
              required
            />
          </div>
          <label for="inputColor">Положение для пк</label>
          <div class="form-group form-row m-3">
            <div class="col-md-4 mb-3">
              <input
                class="form-check-input"
                type="radio"
                name="positionDesktop"
                id="positionDesktop1"
                value="lt"
                v-model="widgetForm.widget.position_desktop"
              />
              <label class="form-check-label" for="positionDesktop1">
                Слева Сверху
              </label>
            </div>
            <div class="form-check col-md-4 mb-3">
              <input
                class="form-check-input"
                type="radio"
                name="positionDesktop"
                id="positionDesktop2"
                value="lb"
                v-model="widgetForm.widget.position_desktop"
              />
              <label class="form-check-label" for="positionDesktop2">
                Слева снизу
              </label>
            </div>
            <div class="form-check col-md-4 mb-3">
              <input
                class="form-check-input"
                type="radio"
                name="positionDesktop"
                id="positionDesktop3"
                value="rt"
                v-model="widgetForm.widget.position_desktop"
              />
              <label class="form-check-label" for="positionDesktop3">
                Справа Сверху
              </label>
            </div>
            <div class="form-check col-md-4 mb-3">
              <input
                class="form-check-input"
                type="radio"
                name="positionDesktop"
                id="positionDesktop4"
                value="rb"
                v-model="widgetForm.widget.position_desktop"
              />
              <label class="form-check-label" for="positionDesktop4">
                Справа снизу
              </label>
            </div>
          </div>
          <label for="inputColor">Положение для мобильных</label>
          <div class="form-group form-row m-3">
            <div class="col-md-4 mb-3">
              <input
                class="form-check-input"
                type="radio"
                name="positionMobile"
                id="positionMobile1"
                value="lt"
                v-model="widgetForm.widget.position_mobile"
              />
              <label class="form-check-label" for="positionMobile1">
                Слева Сверху
              </label>
            </div>
            <div class="form-check col-md-4 mb-3">
              <input
                class="form-check-input"
                type="radio"
                name="positionMobile"
                id="positionMobile2"
                value="lb"
                v-model="widgetForm.widget.position_mobile"
              />
              <label class="form-check-label" for="positionMobile2">
                Слева снизу
              </label>
            </div>
            <div class="form-check col-md-4 mb-3">
              <input
                class="form-check-input"
                type="radio"
                name="positionMobile"
                id="positionMobile3"
                value="rt"
                v-model="widgetForm.widget.position_mobile"
              />
              <label class="form-check-label" for="positionMobile3">
                Справа Сверху
              </label>
            </div>
            <div class="form-check col-md-4 mb-3">
              <input
                class="form-check-input"
                type="radio"
                name="positionMobile"
                id="positionMobile4"
                value="rb"
                v-model="widgetForm.widget.position_mobile"
              />
              <label class="form-check-label" for="positionMobile4">
                Справа снизу
              </label>
            </div>
          </div>
          <select
            class="custom-select my-1 mr-sm-2"
            id="inlineFormCustomSelectPref"
            v-model="widgetForm.widget.prototype_name"
          >
            <option value="Детский">Детский</option>
          </select>
        </div>
        <div class="operators p-3 overflow-auto h-100">
          <h3>Каналы связи</h3>
          <div
            class="card mb-4 box-shadow widget d-inline-flex p-2 bd-highlight"
            style="height:fit-content; width:100%"
            v-for="operator in widgetForm.operators"
            v-bind:key="operator.id"
          >
            <div class="card-body">
              <div class="form-group">
                <label for="inputText">Имя</label>
                <input
                  type="input"
                  class="form-control  form-control-sm"
                  v-model="operator.name"
                  id="inputText"
                  placeholder="Введите что-нибудь"
                  pattern="^[a-zA-ZА-Яа-я0-9\s]{1,40}$"
                  required
                />
              </div>
              <div class="form-group">
                <label for="inputText">Телефон в формате 79996664422</label>
                <input
                  type="input"
                  class="form-control  form-control-sm"
                  v-model="operator.phone"
                  id="inputText"
                  placeholder="Введите что-нибудь"
                  pattern="^(\+?)([0-9-()] ?){9,20}$"
                  required
                />
              </div>
              <div class="form-group">
                <label for="inputText">Сообщение</label>
                <input
                  type="input"
                  class="form-control  form-control-sm"
                  v-model="operator.message"
                  id="inputText"
                  placeholder="Введите что-нибудь"
                  pattern="^[a-zA-ZА-Яа-я0-9\s]{1,40}$"
                />
              </div>
              <div class="form-group">
                <label for="inputText  form-control-sm">Площадка</label>
                <input
                  type="input"
                  class="form-control"
                  v-model="operator.platform_name"
                  id="inputText"
                  placeholder="Введите что-нибудь"
                />
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-danger"
                    @click="deleteOperator(operator)"
                  >
                    Удалить
                  </button>
                </div>
                <small class="text-muted"></small>
              </div>
            </div>
          </div>
          <button
            type="button"
            @click="addOperator()"
            class="btn btn-primary w-100"
          >
            +
          </button>
        </div>
        <div class="preview p-3 h-100">
          <h3>Превью</h3>
          <div class="whatsapp_frame_testtesttesttesttesttesttesttest">
            <div
              class="widget-button"
              style="right: 10px; bottom: 10px; "
              v-bind:style="bStyle"
              @click="dialogOpened = !dialogOpened"
            >
              {{ widgetForm.widget.header }}
            </div>
            <div
              class="widget-dialog"
              style="right: 10px; bottom: 65px;  display: block;"
              v-bind:style="dStyle"
              v-if="dialogOpened"
            >
              <div
                class="widget-header"
                v-bind:style="{ 'background-color': widgetForm.widget.b_color }"
              >
                <div class="widget-hide" @click="dialogOpened = false">x</div>
                {{ widgetForm.widget.description }}
              </div>
              <div class="widget-body">
                <div
                  class="widget-operator"
                  v-for="operator in widgetForm.operators"
                  v-bind:key="'operator' + operator.name"
                  v-on:click="openExample(operator)"
                  href="#"
                >
                  {{ operator.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style>
.editor {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: white;
}
</style>

<script>
import axios from 'axios'
import { eventBus } from './main'
const myApi = axios.create({
  withCredentials: true,
})
export default {
  data() {
    return {
      WO: [],
      isShown: false,
      dialogOpened: false,
      widgetForm: {},
      newForm: {
        widget: {
          id: '',
          name: '',
          header: '',
          description: '',
          b_color: '#68f371',
          position_desktop: 'rb',
          position_mobile: 'rb',
          prototype_name: 'Детский',
        },
        operators: [],
      },
    }
  },
  methods: {
    openExample(operator) {
      window.open(
        'https://wa.me/' + operator.phone + '?text=' + operator.message
      )
    },
    addOperator() {
      this.widgetForm.operators.push({
        message: '',
        name: '',
        phone: '',
        platform_name: 'whatsapp',
      })
    },
    addWidget(evt) {
      evt.preventDefault()
      console.log(this.widgetForm.operators.length)
      if (this.widgetForm.operators.length > 0)
        myApi
          .post('http://188.120.239.117:8000/addwidget/', this.widgetForm)
          .then(result => {
            console.log(result.data.isAffected)
            if (result.data.isAffected === true) {
              this.isShown = false
              this.WO = []
              eventBus.$emit('update')
            }
          })
      else alert('Добавьте оператора, введите имя и номер')
    },
    sendStat(o) {
      myApi
        .post('http://188.120.239.117:8000/click/', {
          o_id: o.id,
          c_name: 'Test city',
        })
        .then(err => {
          if (!err) {
            //isShown = false
          }
        })
    },

    alterWidget(evt) {
      evt.preventDefault()

      myApi
        .post('http://188.120.239.117:8000/alter/', this.$root.formData)
        .then(err => {
          if (!err) {
            this.isShown = false
            eventBus.$emit('update')
          }
        })
    },
  },
  computed: {
    bStyle() {
      return {
        'background-color': this.widgetForm.widget.b_color,
        right: /^r[bt]$/.test(this.widgetForm.widget.position_desktop)
          ? '10px'
          : 'auto',
        left: /^l[bt]$/.test(this.widgetForm.widget.position_desktop)
          ? '67vw'
          : 'auto',
        top: /^[rl]t$/.test(this.widgetForm.widget.position_desktop)
          ? '10px'
          : 'auto',
        bottom: /^[rl]b$/.test(this.widgetForm.widget.position_desktop)
          ? '10px'
          : 'auto',
      }
    },
    dStyle() {
      return {
        'border-color': this.widgetForm.widget.b_color,
        right: /^r[bt]$/.test(this.widgetForm.widget.position_desktop)
          ? '10px'
          : 'auto',
        left: /^l[bt]$/.test(this.widgetForm.widget.position_desktop)
          ? '67vw'
          : 'auto',
        top: /^[rl]t$/.test(this.widgetForm.widget.position_desktop)
          ? '65px'
          : 'auto',
        bottom: /^[rl]b$/.test(this.widgetForm.widget.position_desktop)
          ? '65px'
          : 'auto',
      }
    },
  },
  created() {
    eventBus.$on('getEditor', data => {
      this.isShown = true
      if (data) this.widgetForm.widget = data
      else this.widgetForm = this.newForm
      console.log(this.widgetForm.widget.b_color)

      myApi
        .post('http://188.120.239.117:8000/operators/', { widget_id: data.id })
        .then(res => {
          if (res) {
            this.widgetForm.operators = res.data
          }
        })
      if (this.widgetForm.widget.key)
        myApi
          .post('http://188.120.239.117:8000/client-widget/', {
            code: this.widgetForm.widget.key,
          })
          .then(res => {
            if (res) {
              this.WO = res.data
            }
          })
    })
  },
}
</script>
