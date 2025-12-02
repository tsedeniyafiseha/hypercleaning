// Check if Supabase project is paused or has network issues

async function checkSupabaseStatus() {
  console.log('🔍 Checking Supabase Project Status\n');
  
  const projectRef = 'dhfflpixjzwxexvflpzk'; // From your connection string
  const region = 'eu-west-1';
  
  // Try different endpoints
  const endpoints = [
    `https://${projectRef}.supabase.co`,
    `https://aws-0-${region}.pooler.supabase.com`,
    `https://aws-1-${region}.pooler.supabase.com`,
  ];
  
  console.log('Testing Supabase endpoints:\n');
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Testing: ${endpoint}`);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(endpoint, {
        method: 'HEAD',
        signal: controller.signal,
      });
      
      clearTimeout(timeout);
      console.log(`✅ Reachable (HTTP ${response.status})\n`);
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log(`❌ Timeout (5s) - Network blocked or slow\n`);
      } else {
        console.log(`❌ Error: ${error.message}\n`);
      }
    }
  }
  
  console.log('\n📋 Diagnosis:');
  console.log('If all endpoints timeout or fail:');
  console.log('  1. Your Supabase project might be paused');
  console.log('  2. Your firewall/antivirus is blocking Supabase');
  console.log('  3. Your ISP/network is blocking the connection');
  console.log('  4. You might be behind a corporate proxy/VPN');
  
  console.log('\n🔧 Solutions:');
  console.log('  1. Check Supabase dashboard: https://supabase.com/dashboard');
  console.log('  2. Disable firewall/antivirus temporarily');
  console.log('  3. Try different network (mobile hotspot)');
  console.log('  4. Use local PostgreSQL for development');
  
  console.log('\n💡 To check your Supabase project:');
  console.log(`  Visit: https://supabase.com/dashboard/project/${projectRef}`);
  console.log('  Check if project status is "Active" (not "Paused")');
}

checkSupabaseStatus();
