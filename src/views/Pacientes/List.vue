<template>
  <div>
    <Loader :loading="fetching"/>
    <div class="row">
      <div class="col-lg-12">
        <h1 class="page-header">Pacientes</h1>
      </div>
    </div>

    <div class="panel-body">
      <table width="100%" class="table table-striped table-bordered table-hover" id="dataTables-example">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Nome da mãe</th>
            <th>Telefones</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr class="odd gradeX" v-for="paciente in pacientes" :key="paciente">
            <td>{{ paciente.nome }}</td>
            <td>{{ paciente.cpf }}</td>
            <td>{{ paciente.nomeMae }}</td>
            <td class="telefones">
              <span v-for="telefone in paciente.telefones">{{ `${telefone.ddd} ${telefone.numero}` }}</span>
              <span v-if="!paciente.telefones.length">-</span>
            </td>
            <td><button class="btn btn-info" @click="acessarConsultas(paciente.cpf)">Consultas</button></td>
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
      this.fetchPacientes()
    },
    methods: {
      ...mapActions('pacientes', [
        'fetchPacientes'
      ]),
      acessarConsultas (cpf) {
        this.$router.push(`paciente/consultas/${cpf}`)
      }
    },
    computed: {
      ...mapFields({
        fetching: 'pacientes.fetching',
        pacientes: 'pacientes.pacientes'
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
