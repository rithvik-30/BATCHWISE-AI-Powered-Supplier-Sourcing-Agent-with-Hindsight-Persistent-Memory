import React, { useEffect, useState } from 'react';
import { SupplierSummary } from '../types';
import { getSuppliers } from '../services/api';
import { Layers, CheckCircle2, XCircle, Search, ExternalLink } from 'lucide-react';
import { SupplierDetailModal } from './SupplierDetailModal';

export const SupplierCatalogView: React.FC = () => {
  const [suppliers, setSuppliers] = useState<SupplierSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);

  useEffect(() => {
    getSuppliers()
      .then(setSuppliers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.processes.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase())) ||
      s.materials.some((m) => m.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 font-mono">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#FDFF00]" /> Supplier Intelligence Catalog
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Historical capability records derived from retained sourcing order outcomes across small-batch suppliers.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search supplier, process, material..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#030509] border border-white/15 rounded-sm pl-9 pr-3 py-2 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-[#FDFF00]"
          />
        </div>
      </div>

      {loading && (
        <div className="py-16 text-center text-slate-400 font-mono text-xs">
          Loading supplier memory index...
        </div>
      )}

      {/* Catalog Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier, idx) => (
            <div
              key={idx}
              className="bg-[#030509]/80 border border-white/15 hover:border-white/30 rounded-sm p-6 space-y-4 transition-all duration-200 shadow-lg flex flex-col justify-between backdrop-blur-sm"
            >
              <div className="space-y-3 font-mono">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white uppercase tracking-wider">{supplier.name}</h3>
                    <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                      {supplier.total_experiences} Historical Experiences
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase ${
                      supplier.last_known_outcome.toLowerCase() === 'successful'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {supplier.last_known_outcome}
                  </span>
                </div>

                {/* Score Stats */}
                <div className="grid grid-cols-2 gap-2 bg-[#030509] p-3 rounded-sm border border-white/10 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {supplier.successful_count} Successful
                  </div>
                  <div className="flex items-center gap-1.5 text-red-400 font-semibold">
                    <XCircle className="w-3.5 h-3.5" /> {supplier.failed_count} Failed
                  </div>
                </div>

                {/* Processes */}
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Capabilities & Processes:</span>
                  <div className="flex flex-wrap gap-1">
                    {supplier.processes.map((p, pi) => (
                      <span key={pi} className="text-[10px] bg-[#030509] border border-white/10 text-slate-300 px-2 py-0.5 rounded-sm">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => setSelectedSupplier(supplier.name)}
                className="w-full mt-4 py-2 bg-[#030509] hover:bg-white/10 text-[#FDFF00] text-xs font-mono font-bold uppercase tracking-wider rounded-sm border border-white/15 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Memory Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Supplier Detail Modal */}
      <SupplierDetailModal
        supplierName={selectedSupplier}
        onClose={() => setSelectedSupplier(null)}
      />
    </div>
  );
};
