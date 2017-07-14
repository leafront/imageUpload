;(function(window,document,undefined) {

  window.URL = window.URL || window.webkitURL;
  /*

   * Create e Blob with the file data and get its url with window.URL.createObjectURL(blob)
   * Create new Image element and set it's src to the file blob url
   * Send the image to the canvas. The canvas size is set to desired output size
   * Get the scaled-down data back from canvas via canvas.toDataURL("image/jpeg",0.7) (set your own output format and quality)
   * Attach new hidden inputs to the original form and transfer the dataURI images basically as normal text
  On backend, read the dataURI, decode from Base64, and save it
  */
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

  function drawImageIOSFix(ctx, img) {
    var vertSquashRatio = detectVerticalSquash(img)
    var arg_count = arguments.length
    switch (arg_count) {
      case 4  :
        ctx.drawImage(img, arguments[2], arguments[3] / vertSquashRatio);
        break
      case 6  :
        ctx.drawImage(img, arguments[2], arguments[3], arguments[4], arguments[5] / vertSquashRatio);
        break
      case 8  :
        ctx.drawImage(img, arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7] / vertSquashRatio);
        break
      case 10 :
        ctx.drawImage(img, arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9] / vertSquashRatio);
        break
    }

    // Detects vertical squash in loaded image.
    // Fixes a bug which squash image vertically while drawing into canvas for some images.
    // This is a bug in iOS6 (and IOS7) devices. This function from https://github.com/stomita/ios-imagefile-megapixel
    function detectVerticalSquash(img) {
      var iw = img.naturalWidth, ih = img.naturalHeight
      var canvas = document.createElement("canvas")
      canvas.width = 1
      canvas.height = ih
      var ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      var data = ctx.getImageData(0, 0, 1, ih).data
      // search image edge pixel position in case it is squashed vertically.
      var sy = 0, ey = ih, py = ih
      while (py > sy) {
        var alpha = data[(py - 1) * 4 + 3]
        if (alpha === 0) {
          ey = py
        } else {
          sy = py
        }
        py = (ey + sy) >> 1
      }
      var ratio = (py / ih)
      return (ratio === 0) ? 1 : ratio
    }
  }



  // Detects vertical squash in loaded image.
  // Fixes a bug which squash image vertically while drawing into canvas for some images.
  // This is a bug in iOS6 (and IOS7) devices. This function from https://github.com/stomita/ios-imagefile-megapixel
  function detectVerticalSquash(img) {
      var iw = img.naturalWidth, ih = img.naturalHeight
      var canvas = document.createElement("canvas")
      canvas.width = 1
      canvas.height = ih
      var ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      var data = ctx.getImageData(0, 0, 1, ih).data
      // search image edge pixel position in case it is squashed vertically.
      var sy = 0, ey = ih, py = ih
      while (py > sy) {
          var alpha = data[(py - 1) * 4 + 3]
          if (alpha === 0) {
              ey = py
          } else {
              sy = py
          }
          py = (ey + sy) >> 1
      }
      var ratio = (py / ih)
      return (ratio === 0) ? 1 : ratio
  }


  /* jpeg_encoder_basic.js  for android jpeg压缩质量修复 */
  function JPEGEncoder(a) {
    function I(a) {
      var c, i, j, k, l, m, n, o, p, b = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99];
      for (c = 0; 64 > c; c++)i = d((b[c] * a + 50) / 100), 1 > i ? i = 1 : i > 255 && (i = 255), e[z[c]] = i;
      for (j = [17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99], k = 0; 64 > k; k++)l = d((j[k] * a + 50) / 100), 1 > l ? l = 1 : l > 255 && (l = 255), f[z[k]] = l;
      for (m = [1, 1.387039845, 1.306562965, 1.175875602, 1, .785694958, .5411961, .275899379], n = 0, o = 0; 8 > o; o++)for (p = 0; 8 > p; p++)g[n] = 1 / (8 * e[z[n]] * m[o] * m[p]), h[n] = 1 / (8 * f[z[n]] * m[o] * m[p]), n++
    }

    function J(a, b) {
      var f, g, c = 0, d = 0, e = new Array;
      for (f = 1; 16 >= f; f++) {
        for (g = 1; g <= a[f]; g++)e[b[d]] = [], e[b[d]][0] = c, e[b[d]][1] = f, d++, c++;
        c *= 2
      }
      return e
    }

    function K() {
      i = J(A, B), j = J(E, F), k = J(C, D), l = J(G, H)
    }

    function L() {
      var c, d, e, a = 1, b = 2;
      for (c = 1; 15 >= c; c++) {
        for (d = a; b > d; d++)n[32767 + d] = c, m[32767 + d] = [], m[32767 + d][1] = c, m[32767 + d][0] = d;
        for (e = -(b - 1); -a >= e; e++)n[32767 + e] = c, m[32767 + e] = [], m[32767 + e][1] = c, m[32767 + e][0] = b - 1 + e;
        a <<= 1, b <<= 1
      }
    }

    function M() {
      for (var a = 0; 256 > a; a++)x[a] = 19595 * a, x[a + 256 >> 0] = 38470 * a, x[a + 512 >> 0] = 7471 * a + 32768, x[a + 768 >> 0] = -11059 * a, x[a + 1024 >> 0] = -21709 * a, x[a + 1280 >> 0] = 32768 * a + 8421375, x[a + 1536 >> 0] = -27439 * a, x[a + 1792 >> 0] = -5329 * a
    }

    function N(a) {
      for (var b = a[0], c = a[1] - 1; c >= 0;)b & 1 << c && (r |= 1 << s), c--, s--, 0 > s && (255 == r ? (O(255), O(0)) : O(r), s = 7, r = 0)
    }

    function O(a) {
      q.push(w[a])
    }

    function P(a) {
      O(255 & a >> 8), O(255 & a)
    }

    function Q(a, b) {
      var c, d, e, f, g, h, i, j, l, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, k = 0;
      const m = 8, n = 64;
      for (l = 0; m > l; ++l)c = a[k], d = a[k + 1], e = a[k + 2], f = a[k + 3], g = a[k + 4], h = a[k + 5], i = a[k + 6], j = a[k + 7], p = c + j, q = c - j, r = d + i, s = d - i, t = e + h, u = e - h, v = f + g, w = f - g, x = p + v, y = p - v, z = r + t, A = r - t, a[k] = x + z, a[k + 4] = x - z, B = .707106781 * (A + y), a[k + 2] = y + B, a[k + 6] = y - B, x = w + u, z = u + s, A = s + q, C = .382683433 * (x - A), D = .5411961 * x + C, E = 1.306562965 * A + C, F = .707106781 * z, G = q + F, H = q - F, a[k + 5] = H + D, a[k + 3] = H - D, a[k + 1] = G + E, a[k + 7] = G - E, k += 8;
      for (k = 0, l = 0; m > l; ++l)c = a[k], d = a[k + 8], e = a[k + 16], f = a[k + 24], g = a[k + 32], h = a[k + 40], i = a[k + 48], j = a[k + 56], I = c + j, J = c - j, K = d + i, L = d - i, M = e + h, N = e - h, O = f + g, P = f - g, Q = I + O, R = I - O, S = K + M, T = K - M, a[k] = Q + S, a[k + 32] = Q - S, U = .707106781 * (T + R), a[k + 16] = R + U, a[k + 48] = R - U, Q = P + N, S = N + L, T = L + J, V = .382683433 * (Q - T), W = .5411961 * Q + V, X = 1.306562965 * T + V, Y = .707106781 * S, Z = J + Y, $ = J - Y, a[k + 40] = $ + W, a[k + 24] = $ - W, a[k + 8] = Z + X, a[k + 56] = Z - X, k++;
      for (l = 0; n > l; ++l)_ = a[l] * b[l], o[l] = _ > 0 ? 0 | _ + .5 : 0 | _ - .5;
      return o
    }

    function R() {
      P(65504), P(16), O(74), O(70), O(73), O(70), O(0), O(1), O(1), O(0), P(1), P(1), O(0), O(0)
    }

    function S(a, b) {
      P(65472), P(17), O(8), P(b), P(a), O(3), O(1), O(17), O(0), O(2), O(17), O(1), O(3), O(17), O(1)
    }

    function T() {
      var a, b;
      for (P(65499), P(132), O(0), a = 0; 64 > a; a++)O(e[a]);
      for (O(1), b = 0; 64 > b; b++)O(f[b])
    }

    function U() {
      var a, b, c, d, e, f, g, h;
      for (P(65476), P(418), O(0), a = 0; 16 > a; a++)O(A[a + 1]);
      for (b = 0; 11 >= b; b++)O(B[b]);
      for (O(16), c = 0; 16 > c; c++)O(C[c + 1]);
      for (d = 0; 161 >= d; d++)O(D[d]);
      for (O(1), e = 0; 16 > e; e++)O(E[e + 1]);
      for (f = 0; 11 >= f; f++)O(F[f]);
      for (O(17), g = 0; 16 > g; g++)O(G[g + 1]);
      for (h = 0; 161 >= h; h++)O(H[h])
    }

    function V() {
      P(65498), P(12), O(3), O(1), O(0), O(2), O(17), O(3), O(17), O(0), O(63), O(0)
    }

    function W(a, b, c, d, e) {
      var h, l, o, q, r, s, t, u, v, w, f = e[0], g = e[240];
      const i = 16, j = 63, k = 64;
      for (l = Q(a, b), o = 0; k > o; ++o)p[z[o]] = l[o];
      for (q = p[0] - c, c = p[0], 0 == q ? N(d[0]) : (h = 32767 + q, N(d[n[h]]), N(m[h])), r = 63; r > 0 && 0 == p[r]; r--);
      if (0 == r)return N(f), c;
      for (s = 1; r >= s;) {
        for (u = s; 0 == p[s] && r >= s; ++s);
        if (v = s - u, v >= i) {
          for (t = v >> 4, w = 1; t >= w; ++w)N(g);
          v = 15 & v
        }
        h = 32767 + p[s], N(e[(v << 4) + n[h]]), N(m[h]), s++
      }
      return r != j && N(f), c
    }

    function X() {
      var b, a = String.fromCharCode;
      for (b = 0; 256 > b; b++)w[b] = a(b)
    }

    function Y(a) {
      if (0 >= a && (a = 1), a > 100 && (a = 100), y != a) {
        var b = 0;
        b = 50 > a ? Math.floor(5e3 / a) : Math.floor(200 - 2 * a), I(b), y = a, console.log("Quality set to: " + a + "%")
      }
    }

    function Z() {
      var c, b = (new Date).getTime();
      a || (a = 50), X(), K(), L(), M(), Y(a), c = (new Date).getTime() - b, console.log("Initialization " + c + "ms")
    }

    var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H;
    Math.round, d = Math.floor, e = new Array(64), f = new Array(64), g = new Array(64), h = new Array(64), m = new Array(65535), n = new Array(65535), o = new Array(64), p = new Array(64), q = [], r = 0, s = 7, t = new Array(64), u = new Array(64), v = new Array(64), w = new Array(256), x = new Array(2048), z = [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63], A = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], B = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], C = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125], D = [1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250], E = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], F = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], G = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119], H = [0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250], this.encode = function (a, b) {
      var d, e, f, m, n, o, p, y, z, A, B, C, D, E, F, G, H, I, J, K, c = (new Date).getTime();
      for (b && Y(b), q = new Array, r = 0, s = 7, P(65496), R(), T(), S(a.width, a.height), U(), V(), d = 0, e = 0, f = 0, r = 0, s = 7, this.encode.displayName = "_encode_", m = a.data, n = a.width, o = a.height, p = 4 * n, z = 0; o > z;) {
        for (y = 0; p > y;) {
          for (D = p * z + y, E = D, F = -1, G = 0, H = 0; 64 > H; H++)G = H >> 3, F = 4 * (7 & H), E = D + G * p + F, z + G >= o && (E -= p * (z + 1 + G - o)), y + F >= p && (E -= y + F - p + 4), A = m[E++], B = m[E++], C = m[E++], t[H] = (x[A] + x[B + 256 >> 0] + x[C + 512 >> 0] >> 16) - 128, u[H] = (x[A + 768 >> 0] + x[B + 1024 >> 0] + x[C + 1280 >> 0] >> 16) - 128, v[H] = (x[A + 1280 >> 0] + x[B + 1536 >> 0] + x[C + 1792 >> 0] >> 16) - 128;
          d = W(t, g, d, i, k), e = W(u, h, e, j, l), f = W(v, h, f, j, l), y += 32
        }
        z += 8
      }
      return s >= 0 && (I = [], I[1] = s + 1, I[0] = (1 << s + 1) - 1, N(I)), P(65497), J = "data:image/jpeg;base64," + btoa(q.join("")), q = [], K = (new Date).getTime() - c, console.log("Encoding time: " + K + "ms"), J
    }, Z()
  }
  function getImageDataFromImage(a) {
    var d, b = "string" == typeof a ? document.getElementById(a) : a, c = document.createElement("canvas");
    return c.width = b.width, c.height = b.height, d = c.getContext("2d"), d.drawImage(b, 0, 0), d.getImageData(0, 0, c.width, c.height)
  }


  var api = {
    dataURL2Blob: function( dataURI ) {
      var byteStr, intArray, ab, i, mimetype, parts;

      parts = dataURI.split(',');

      if ( ~parts[ 0 ].indexOf('base64') ) {
          byteStr = atob( parts[ 1 ] );
      } else {
          byteStr = decodeURIComponent( parts[ 1 ] );
      }

      ab = new ArrayBuffer( byteStr.length );
      intArray = new Uint8Array( ab );

      for ( i = 0; i < byteStr.length; i++ ) {
          intArray[ i ] = byteStr.charCodeAt( i );
      }

      mimetype = parts[ 0 ].split(':')[ 1 ].split(';')[ 0 ];

      return this.arrayBufferToBlob( ab, mimetype );
    },
    arrayBufferToBlob: function( buffer, type ) {
        var builder = window.BlobBuilder || window.WebKitBlobBuilder,
            bb;

        // android不支持直接new Blob, 只能借助blobbuilder.
        if ( builder ) {
            bb = new builder();
            bb.append( buffer );
            return bb.getBlob( type );
        }

        return new Blob([ buffer ], type ? { type: type } : {} );
    }
  }

  var blobConstruct = !!(function () { // Test for constructing of blobs using new Blob()
          try { return new Blob(); } catch (e) {}
  })()

  // Fallback to BlobBuilder (deprecated)
  var XBlob = blobConstruct ? window.Blob : function (parts, opts) {
      var bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
      parts.forEach(function (p) {
          bb.append(p);
      });

      return bb.getBlob(opts ? opts.type : undefined);
  }


  function ImageUpload(file, options) {
    options = Object.assign({
      quality: .8,
      imageMinZoomWidth: 540,
      onUpload: function(){},
      onError: function(){},
      fileKey: 'file'
    }, options);

    this.options = options;
    this.file = file;
  }

   ImageUpload.prototype = {
    constructor: ImageUpload,
    // 创建图片对象
    start: function() {
      this.img = document.createElement('img');

      this.img.onload = this.imgLoaded.bind(this)

      this.img.src = URL.createObjectURL(this.file);
      console.log('文件大小:' + this.file.size/ 1024 + 'kb');
    },
    getBlob: function() {
      return this.img.src;
    },
    // 压缩图片，然后上传
    imgLoaded: function() {
      this.compress();
    },
    compress: function() {

      var This = this;

      var img = this.img;

      EXIF.getData(this.file, function() {

          var orientation = EXIF.getTag(this, "Orientation");
          This.drawImage(img, orientation);

      })

    },
    drawImage: function(img,orientation){
      //生成比例

      var w = img.width,
      h = img.height,
      scale = w / h;
      w = w > this.options.imageMinZoomWidth ? this.options.imageMinZoomWidth : w;
      h = w / scale;
      //生成canvas
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h);
      switch (orientation) {
        case 2:
          ctx.translate(w, 0);
          ctx.scale(-1,1);
          break;
        case 3:
          ctx.translate(w,h);
          ctx.rotate(Math.PI);
          break;
        case 4:
          ctx.translate(0,h);
          ctx.scale(1,-1);
          break;
        case 5:
          ctx.rotate(0.5 * Math.PI);
          ctx.scale(1,-1);
          break;
        case 6:
          ctx.rotate(0.5 * Math.PI);

          ctx.translate(0,-h);

          break;
        case 7:
          ctx.rotate(0.5 * Math.PI);
          ctx.translate(w,-h);
          ctx.scale(-1,1);
          break;
        case 8:
          ctx.rotate(-0.5 * Math.PI);
          ctx.translate(-w,0);
          break;
      }

      var base64 = canvas.toDataURL('image/jpeg', this.options.quality);

      // 修复IOS
      if (isIOS) {
        drawImageIOSFix(ctx, img, 0, 0, img.width, img.height, 0, 0, w, h);
        //var mpImg = new MegaPixImage(img);
        //mpImg.render(canvas, { maxWidth: w, maxHeight: h, quality: quality || 0.8});
        base64 = canvas.toDataURL('image/jpeg', this.options.quality);
        this.formBlob = this.getSource(base64);
      }

      // 修复android
      if (isAndroid) {
          var encoder = new JPEGEncoder();
          base64 = encoder.encode(ctx.getImageData(0, 0, w, h), this.options.quality * 100);
          this.formBlob = this.getSource(base64);

      }
      this.upload();
    },
    getSource:function(base64) {
      var blob = api.dataURL2Blob(base64);

      if (blob.size < this.file.size) {
        console.log('压缩大小' + blob.size / 1024 + 'kb');
        return blob;
      } else {
        console.log('使用原图');
        this.uploadFile = true;
        return this.file;
      }
    },
    upload: function() {

      var xhr = new XMLHttpRequest();

      var fd = new FormData();

      var options = this.options;

      xhr.open("POST", options.url, true);

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          if (xhr.status == 200) {
            var res = JSON.parse(xhr.responseText);
            options.onUpload(res);
          } else {
            options.onError();
          }
        }
      };

      options.data[this.options.fileKey] = this.formBlob;

      for (var i in options.data) {
        fd.append(i, options.data[i]);
      }

      xhr.send(fd);

      return xhr;
    }
  }
  window.ImageUpload = ImageUpload;
})(window,document,undefined)
