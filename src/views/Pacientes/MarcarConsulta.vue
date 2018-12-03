<template>
  <div>
    <Loader :loading="fetching || loading"/>
    <div v-if="!fetching && !loading">
      <div class="row">
        <div class="col-lg-12">
          <h1 class="page-header">Marcar Consulta</h1>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-3">
          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <label>Médico</label>
                <select v-model="consulta.crm" class="form-control">
                  <option :value=null>Selecione</option>
                  <option v-for="medico in medicos" :key="medico" :value="medico.crm">{{ medico.nome }}</option>
                </select>
              </div>
            </div>

            <div class="col-12">
              <div class="form-group">
                <label>Atendente</label>
                <select v-model="consulta.atendente" class="form-control">
                  <option :value=null>Selecione</option>
                  <option v-for="atendente in atendentes" :key="atendente" :value="atendente.id">{{ atendente.nome }}</option>
                </select>
              </div>
            </div>

            <div class="col-12">
              <div class="form-group">
                <label>Atendente</label>
                <el-date-picker
                  v-model="date"
                  type="datetime"
                  format="dd/MM/yyyy HH:mm"
                  start-placeholder="Data Inicial">
                </el-date-picker>
              </div>
            </div>

            <div class="col-12">
              <button class="btn btn-success" @click="marcar()" v-bind:class="{ 'is-loading': saving }">Cadastrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import notifier from '@/notifier'
  import api from '@/api'
  import Loader from '@/components/template/Loader'
  import { mapFields } from 'vuex-map-fields'
  import { mapActions } from 'vuex'
  import moment from 'moment'

  export default {
    data: () => ({
      loading: false,
      saving: false,
      consulta: {
        cpf: null,
        crm: null,
        atendente: null,
        agendaMedico: null
      },
      date: null,
      atendentes: []
    }),
    props: {
      cpf: {
        type: String,
        required: true
      }
    },
    mounted () {
      this.loading = true

      if (!this.medicos.length) {
        this.fetchMedicos()
      }

      api.getAtendentes()
        .then(atendentes => {
          this.atendentes = atendentes

          if (atendentes.length === 1) {
            this.consulta.atendente = atendentes[0].id
          }
        })
        .catch(() => {})
        .then(() => {
          this.loading = false
        })

      if (this.medicos.length === 1) {
        this.consulta.crm = this.medicos[0].crm
      }

      this.consulta.cpf = this.cpf
    },
    methods: {
      ...mapActions('medicos', [
        'fetchMedicos'
      ]),
      marcar () {
        this.saving = true

        api.getHorarioDisponivel(this.consulta.crm, moment(this.date).format())
          .then(resultado => {
            this.consulta.agendaMedico = resultado.id

            api.marcarConsulta(this.consulta)
              .then(() => notifier.success('Consulta marcada com sucesso.', 'Marcar consulta'))
          })
          .catch(() => {})
          .then(() => { this.saving = false })
      }
    },
    computed: {
      ...mapFields({
        fetching: 'medicos.fetching',
        medicos: 'medicos.medicos'
      })
    },
    components: {
      Loader
    }
  }
</script>

<style lang="sass" scoped>
  label
    display: block

  .btn.is-loading
    color: transparent !important
    cursor: not-allowed !important
    position: relative


  .btn.is-loading::after
    -webkit-animation: spin-around 500ms infinite linear
    -o-animation: spin-around 500ms infinite linear
    animation: spin-around 500ms infinite linear
    border: 2px solid #888888
    border-radius: 50%
    border-right-color: transparent
    border-top-color: transparent
    content: ""
    display: block
    height: 16px
    width: 16px
    position: absolute
    left: 50%
    top: 50%
    margin-left: -8px
    margin-top: -8px

  @-webkit-keyframes spin-around
    from
      -webkit-transform: rotate(0deg)
      transform: rotate(0deg)

    to
      -webkit-transform: rotate(359deg)
      transform: rotate(359deg)
</style>
