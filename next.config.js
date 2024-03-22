const getProxyConfig = (basePath) => ({
  source: `${basePath}/:path*`,
  destination: `http://inspector.estate:3434${basePath}/:path*`, // Proxy to Backend
});

const services = ["/contract", "/user", "/request", "/offer", "/agent"];

const proxyConfig = services.map((basePath) => getProxyConfig(basePath));

module.exports = {
  async rewrites() {
    return proxyConfig;
  },
};

// inspector.estate
// revizor.estate
// rexi-zor.ru
