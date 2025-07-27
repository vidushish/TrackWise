import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import CopyrightIcon from '@mui/icons-material/Copyright';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function Footer() {
	return (
		<div className="absolute bottom-0 left-0 w-full bg-[#351c4fff] text-white py-3 px-6">
			<div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-7xl mx-auto space-y-4 sm:space-y-0">
				
				<div className="flex space-x-3">
					<div className="rounded-md text-white opacity-80 hover:opacity-100 cursor-pointer">
						<LinkedInIcon fontSize="medium" />
				</div>
					<div className="rounded-md text-white opacity-80 hover:opacity-100 cursor-pointer">
						<FacebookIcon fontSize="medium" />
					</div>
					<div className="rounded-md text-white opacity-80 hover:opacity-100 cursor-pointer">
						<InstagramIcon fontSize="medium" />
					</div>
					<div className="rounded-md text-white opacity-80 hover:opacity-100 cursor-pointer">
						<XIcon fontSize="small" />
					</div>
				</div>
              <div className="flex items-center space-x-2 text-sm">
					<CopyrightIcon fontSize="small" />
					<span>2025 - TrackWise</span>
				</div>
				<div className="flex space-x-4 text-sm">
					<p className="hover:underline cursor-pointer">Terms</p>
					<p className="hover:underline cursor-pointer">Privacy</p>
					<p className="hover:underline cursor-pointer">Cookies</p>
				</div>
			</div>
		</div>
	);
}
