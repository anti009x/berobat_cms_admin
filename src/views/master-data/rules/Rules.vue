<template>
    <div>

  
      <div class="row">
        <!-- First column (70% width) -->
        <div class="col-md-8">
          <div class="table-responsive shadow-lg p-3 mb-5 rounded">
            <table class="table table-hover border">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>GEJALA</th>
                  <th>VALUE CF</th>
                  <th style="width: 20%;">UBAH VALUE.CF</th>
                  <th style="width: 10%;">STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in gejalaList" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.nama }}</td>
                  <td>{{ item.cf }}</td>
                  <td>
                    <input type="number" step="0.2" class="form-control form-control-sm" :value="item.cf" @input="updateValueCF(item)">
                  </td>
                  <td>
                    <div class="custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input check" v-model="item.checked" :id="'checkbox-' + item.id">
                      <label class="custom-control-label" :for="'checkbox-' + item.id"></label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
        <!-- Second column (20% width) -->
        <div class="col-md-4">
          <div class="table-responsive shadow-lg p-3 mb-5 rounded">
            <table class="table table-hover border hover" style="color: black;">
              <thead>
                <tr>
                  <th style="background-color: #4E73DF; color: aliceblue;" >Penyakit</th>
                </tr>
              </thead>
              <tbody>
         
                <tr v-for="penyakit in penyakitList" :key="penyakit.id" @click="fetchGejalaData(penyakit.id) " class="hover" style="cursor: pointer; "  >
                  <td>{{ penyakit.nama }}</td>
                </tr>
        
              </tbody>
            </table>
          </div>
          <div style="margin-top: -2rem;">
            <button
              type="submit"
              class="btn btn-primary btn-outline-dark"
              style="color: white; box-shadow: 2px 2px black"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style>

  </style>
  
  <script>
  export default {
    data() {
      return {
        gejalaList: [],
        penyakitList: [],
        selectedPenyakitId: null, // To store the selected penyakit ID
      };
    },
    created() {
      // Fetch data for gejala
      this.fetchGejalaData();
  
      // Fetch data for penyakit
      this.fetchPenyakitData();
    },
    methods: {
      async fetchGejalaData(penyakitId) {
        try {
          // Ganti URL ini dengan titik akhir API Anda yang untuk gejala
          const apiEndpoint = `http://192.168.100.56:8000/api/rule/${penyakitId}`;
          const response = await fetch(apiEndpoint);
          const data = await response.json();
  
          // Membuat objek untuk menyimpan gejala dengan value_cfnya masing-masing
          const gejalaValueCF = {};
          data.rule_data.forEach(rule => {
            gejalaValueCF[rule.gejala_id] = rule.value_cf;
          });
  
          // Setel semua data gejala ke gejalaList dengan cf dari API dan setel properti berdasarkan gejala_id
          this.gejalaList = data.gejala.map(gejala => {
            return {
              id: gejala.id,
              cf: gejalaValueCF[gejala.id] || 0, // value_cf dari API dan default ke 0 jika tidak ditemukan
              checked: this.isGejalaChecked(gejala.id, data.rule_data), // berdasarkan gejala_id dan aturan_data
              nama: gejala.nama
            };
          });
  
          // Update selectedPenyakitId
          this.selectedPenyakitId = penyakitId;
        } catch (error) {
          console.error('Error fetching gejala data:', error);
        }
      },
      async fetchPenyakitData() {
        try {
          // Ganti URL ini dengan titik akhir API Anda yang untuk penyakit
          const response = await fetch('http://192.168.100.56:8000/api/penyakit');
          const data = await response.json();
  
          // Perbarui data komponen dengan data yang diambil
          this.penyakitList = data;
        } catch (error) {
          console.error('Error fetching penyakit data:', error);
        }
      },
      updateValueCF(item) {
        // perubahan input dan perbarui item.cf
        // validasijika diperlukan
        item.cf = parseFloat(event.target.value);
      },
      isGejalaChecked(gejalaId, ruleData) {
        // Periksa apakah gejalaId ada di ruleData dan nilai true jika ditemukan, jika tidak, kembalikan salah
        return ruleData.some(rule => rule.gejala_id === gejalaId);
      }
    }
  };
  </script>
  