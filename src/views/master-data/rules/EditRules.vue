<template>
    <div>
      <div class="row">
        <div class="col-md-6">
          <div class="table-responsive shadow-lg p-3 mb-5 rounded">
            <table class="table table-hover border">
              <thead>
                <tr style="background-color: #4E73DF; color: aliceblue;">
                  <th>GEJALA</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>tipes</td>
                  <td>
                    <button type="button" class="btn btn-primary btn-sm mx-1 p-2 mx-sm-1 mx-lg-1">UPDATE</button>
                    <button type="button" class="btn btn-primary btn-sm mx-1 p-2 mx-sm-1 mx-lg-1">DELETE</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="margin-top: -2rem; " class="mb-4">
            <button
              type="button"
              class="btn btn-primary btn-outline-dark btn-sm"
              style="color: white; box-shadow: 2px 2px black"
            >
              TAMBAH DATA
            </button>
          </div>
        </div>
  
        <div class="col-md-3">
          <div class="table-responsive shadow-lg p-3 mb-5 rounded">
            <table class="table table-hover border hover" style="color: black;">
              <thead>
                <tr style="background-color: #4E73DF; color: aliceblue;">
                  <th>PENYAKIT</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>INFLUENZA</td>
                  <td>
                    <button type="button" class="btn btn-primary btn-sm mx-1 mx-sm-1 mx-lg-1">UPDATE</button>
                    <button type="button" class="btn btn-primary btn-sm mx-1 mx-sm-1 mx-lg-1">DELETE</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="margin-top: -2rem;">
            <button
              type="button"
              class="btn btn-primary btn-outline-dark btn-sm"
              style="color: white; box-shadow: 2px 2px black"
            >
              TAMBAH DATA
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style>
    
  </style>
  