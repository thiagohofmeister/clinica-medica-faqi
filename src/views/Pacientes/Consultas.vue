<template>
  <div>
    <Loader :loading="loading"/>
    <div v-if="!loading">
      <div class="row">
        <div class="col-lg-12">
          <h1 class="page-header">Consultas</h1>
        </div>
      </div>

      <div class="panel-body">
        <button class="btn btn-success" @click="marcar()">Marcar</button>

        <table width="100%" class="table table-striped table-bordered table-hover" id="dataTables-example" v-if="consultas.length">
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Data</th>
              <th>Status</th>
              <th>Atendente</th>
            </tr>
          </thead>

          <tbody>
          <tr class="odd gradeX" v-for="consulta in consultas" :key="consulta">
            <td>{{ consulta.paciente.nome }}</td>
            <td>{{ consulta.medico.nome }}</td>
            <td>{{ consulta.data.substr(0, consulta.data.length - 5) | moment('DD/MM/YYYY HH:mm') }}</td>
            <td>{{ consulta.status }}</td>
            <td>{{ consulta.atendente.nome }}</td>
          </tr>
          </tbody>
        </table>

        <div v-else>Não há consultas marcadas.</div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import Loader from '@/components/template/Loader'

  export default {
    data: () => ({
      loading: false,
      consultas: []
    }),
    props: {
      cpf: {
        type: String,
        required: true
      }
    },
    mounted () {
      this.loading = true

      api.getPacienteConsultas(this.cpf)
        .then(consultas => {
          this.consultas = consultas
        })
        .catch(() => {})
        .then(() => {
          this.loading = false
        })
    },
    methods: {
      marcar () {
        this.$router.push(`/paciente/marcar/${this.cpf}`)
      }
    },
    components: {
      Loader
    }
  }
</script>

<style lang="sass" scoped>
  .btn
    margin-bottom: 20px
</style>
