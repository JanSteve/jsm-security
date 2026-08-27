#!/usr/bin/env python3
"""
🏛️ JSM 24/7 LOCAL BACKGROUND WORKFORCE DAEMON
Runs in the background, executing AI agents on automatic schedules:
- Every 6 hours: B2B Lead Hunter (Fresh enterprise batches)
- Every 12 hours: Content King (LinkedIn & IG posts)
- Every 24 hours: Dominator (Google Business Profile) & Analyst BI
"""

import time
import subprocess
import sys
import os
from datetime import datetime

INTERVAL_SECONDS = 3600 * 6  # 6 Hours

print("=" * 70)
print("  🏛️ JSM 24/7 AUTONOMOUS WORKFORCE DAEMON STARTED")
print(f"  Start Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S IST')}")
print(f"  Cycle Interval: Every {INTERVAL_SECONDS // 3600} hours")
print("=" * 70)

while True:
    try:
        print(f"\n⏰ [{datetime.now().strftime('%Y-%m-%d %H:%M:%S IST')}] Triggering scheduled AI agent cycle...")
        subprocess.run([sys.executable, "run_all_agents.py"], check=True)
        print(f"✅ Cycle completed successfully. Next run in {INTERVAL_SECONDS // 3600} hours.")
    except Exception as e:
        print(f"⚠️ Error during daemon cycle: {e}")
    
    time.sleep(INTERVAL_SECONDS)
