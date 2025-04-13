jQuery(document).ready(function($) {
  const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTBx2QFmcm79K2dkyShsmZEV490KKtEMIYIrzG7HrxAw1Z5AxPFHzvoFhKNdOigjRnb7VAbrSpUPtII/pub?output=csv';

  Papa.parse(csvUrl, {
    download: true,
    header: true,
    complete: function(results) {
      const data = results.data;
      const tbody = $('#csvTable tbody');

      // Clear existing data
      tbody.empty();

      // Process and append rows
      data.forEach(function(row, index) {
        if (!row["S.N."]) return;

        const tableRow = `
          <tr>
            <td>${row["S.N."]}</td>
            <td>${row["Letter No."]}</td>
            <td>${row["Date"]}</td>
            <td class="wrap-text">${row["Subject"]}</td>
            <td>${row["Button"]}</td>
          </tr>`;
        tbody.append(tableRow);
      });

      // Initialize DataTable with Divi-compatible settings
      $('#csvTable').DataTable({
        responsive: true,
        pageLength: 5,
        autoWidth: false,
        dom: 'lrtip', // Simplified layout
        language: {
          searchPlaceholder: "Search...",
          search: ""
        },
        columnDefs: [
          { targets: '_all', className: 'dt-left' }
        ],
        initComplete: function(settings, json) {
          // Add wrapper padding
          $('.dataTables_wrapper').css('padding-bottom', '20px');
          
          // Force header color refresh
          $('#csvTable thead th').css({
            'background-color': '#e615ed',
            'color': '#ffffff'
          });
        },
        drawCallback: function(settings) {
          // Re-apply styles after table redraws
          $('#csvTable thead th').css({
            'background-color': '#e615ed',
            'color': '#ffffff'
          });
        }
      });
    },
    error: function(err) {
      console.error('Error loading CSV:', err);
    }
  });
});
