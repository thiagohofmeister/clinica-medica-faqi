<template>
  <div id="wrapper">

    <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="index.html">Clínica Médica</a>
      </div>

      <div class="navbar-default sidebar" role="navigation">
        <div class="sidebar-nav navbar-collapse">
          <ul class="nav" id="side-menu">
            <li>
              <router-link to="/"><i class="fa fa-table fa-fw"></i> Pacientes</router-link>
            </li>

            <li>
              <router-link to="/medicos"><i class="fa fa-table fa-fw"></i> Medicos</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div id="page-wrapper">
      <router-view/>
    </div>

  </div>
</template>
