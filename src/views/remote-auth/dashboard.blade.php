<!DOCTYPE html>
<html>

<head>
  <title>Remote auth dashboard</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/axentix@2.2.1/dist/axentix.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">

  <style>
    body {
      background-color: rgb(19, 19, 19);
      color: white;
      --ax-sidenav-width: 18rem;
      --ax-skeleton-background-from: #e0e4e7;
      --ax-skeleton-background-to: #ffa909;
    }

    .hide {
      display: none;
    }

    .sidenav {
      background-color: #0d0d0d;
      scrollbar-width: 1px;
    }

    .dark {
      background-color: #0d0d0d;

    }


    .sidenav::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #080808;
      border-radius: 10px;
    }

    .sidenav::-webkit-scrollbar {
      width: 0.3rem;
      background-color: #1b1b1b;
    }

    .sidenav::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #ffc456;
    }

    .sidenav i {
      padding: 10px;
      border-radius: 50%;
    }

    .status-icon {
      /* padding: 0.75rem; */
      border-radius: 50%;
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;
      border-radius: 50%;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }



    .online-i {
      color: #83ff64;
      box-shadow: 0 0 10px #83ff64;
    }

    .online {
      color: #83ff64;
      animation: dynamise-online 5s infinite;
    }

    .forbidden-i {
      box-shadow: 0 0 10px #ffc456;
      color: #ffc456;
    }

    .forbidden {
      color: #ffc456;
      animation: dynamise-forbidden 3.5s infinite;
    }

    .offline-i {
      box-shadow: 0 0 10px #ff3333;
      color: #ff3333;
    }

    .offline {
      color: #ff3333;
      animation: dynamise-offline 1s infinite;
    }

    @keyframes dynamise-online {
      0% {
        box-shadow: 0 0 2px #83ff64;
      }

      50% {
        box-shadow: 0 0 10px #83ff64;

      }

      100% {
        box-shadow: 0 0 2px #83ff64;
      }
    }

    @keyframes dynamise-forbidden {
      0% {
        box-shadow: 0 0 2px #ffc456;
      }

      50% {
        box-shadow: 0 0 10px #ffc456;

      }

      100% {
        box-shadow: 0 0 2px #ffc456;
      }
    }

    @keyframes dynamise-offline {
      0% {
        box-shadow: 0 0 2px #ff3333;
      }

      50% {
        box-shadow: 0 0 10px #ff3333;

      }

      100% {
        box-shadow: 0 0 2px #ff3333;
      }
    }
  </style>
</head>

<body class="layout-sidenav-fixed">
  <div id="sidenav" data-ax="sidenav" class="sidenav shadow-1 sidenav-fixed white px-4">
    <div class="sidenav-header p-0 text-white font-s5 ">
      <p class="font-w300">DASHBOARD</p>
      <p class="font-s2 mt-3 mb-0 mr-auto">Status</p>
      <div class="divider bd-grey mr-auto mb-2"></div>
      <div class="grix xs4 center gutter-xs5 font-s2">
        <div class="d-flex vcenter">
          <i id="status-total-i" class="skeleton mr-2 status-icon fa-solid fa-server"></i>
          <p class="skeleton" id="status-total"></p>
        </div>
        <div class="d-flex vcenter">
          <span id="status-online" class="skeleton online-i status-icon"></span>
        </div>
        <div class="d-flex vcenter">
          <span id="status-forbidden" class="skeleton forbidden-i status-icon"></span>
        </div>
        <div class="d-flex vcenter">
          <span id="status-offline" class="skeleton offline-i status-icon"></span>
        </div>
      </div>
    </div>
    <p class="font-s2 mt-3 mb-0 mr-auto text-white">Endpoints</p>
    <div class="divider bd-grey mb-4"></div>
    @foreach($websites as $website)
    <a id="link-{{ $loop->index + 1 }}" href="#" class="mb-3 sidenav-link p-0 d-flex text-white"><i
        class="skeleton mr-4 my-auto fa-solid fa-power-off"></i>{{
      $website['name'] }}</a>
    @endforeach
  </div>
  <main class="mx-5">
    <!-- Code here the main content -->
    <button data-target="sidenav" class="btn rounded-1 press amaranth dark-1 hide-md-up">
      Open sidenav
    </button>

    <div id="chart" class="overflow-visible mx-5 my-5"></div>
    <!-- Form -->
    <div class="mx-5">
      <p class="font-s3" id="endpoint-name"></p>
      <div class="table-responsive hide">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="tbody">
            <tr>
              <td>toto</td>
              <td>toto</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal rounded-3 dark" id="modal">
      <div id="modal-title" class="modal-header text-center">Locked</div>
      <div class="modal-content">
        <div class="d-flex fx-col fx-center vcenter">
          <form class="form-material">
            <div class="form-field">
              <label for="name">Password</label>
              <div class="form-group rounded-1">
                <input type="password" data-endpoint="" id="pwd" class="form-control" />
                <input type="text" hidden id="user_id" />
                <span class="form-group-item"><i id="show-icon" class="fa-solid fa-eye-slash"></i></span>
              </div>
            </div>
          </form>
          <button id="submit" class="btn orange rounded-4 mt-4 text-white px-5 py-2">Submit</button>
        </div>
      </div>
    </div>
  </main>
  <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
  <script src="https://cdn.jsdelivr.net/npm/axentix@2.2.1/dist/axentix.min.js"></script>
  <script>
    const sites = @json($websites);
    sites.map((site, i) => site.id = i + 1)
  </script>
  <script src="{{ asset('js/remote-auth.js') }}"></script>
</body>

</html>