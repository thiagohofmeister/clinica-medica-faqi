<template>
  <div>
    <Loader :loading="fetching"/>
    <div class="row">
      <div class="col-lg-12">
        <h1 class="page-header">Médicos</h1>
      </div>
    </div>

    <div class="panel-body">
      <table width="100%" class="table table-striped table-bordered table-hover" id="dataTables-example">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CRM</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr class="odd gradeX" v-for="medico in medicos" :key="medico">
            <td>{{ medico.nome }}</td>
            <td>{{ medico.crm}}</td>
            <td width="220">
              <button class="btn btn-info" @click="acessarAgenda(medico.crm)">Agenda</button>
              <button class="btn btn-info" @click="acessarConsultas(medico.crm)">Consultas</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
  import { mapFields } from 'vuex-map-fields'
  import { mapActions } from 'vuex'
  import Loader from '@/components/template/Loader'

  export default {
    mounted () {
      this.fetchMedicos()
    },
    methods: {
      ...mapActions('medicos', [
        'fetchMedicos'
      ]),
      acessarAgenda (crm) {
        this.$router.push(`medico/agenda/${crm}`)
      },
      acessarConsultas (crm) {
        this.$router.push(`medico/consultas/${crm}`)
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
  .telefones
    & > span
      display: block
</style>
